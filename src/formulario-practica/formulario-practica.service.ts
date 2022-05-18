import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormularioPracticaUpdateDTO } from './dto/formulario-practica-update.dto';
import { FormularioPracticaDTO } from './dto/formulario-practica.dto';
import { IFormularioPractica } from './interface/formulario-practica.interface';
import * as mongoose  from 'mongoose';
import * as pdf from 'pdf-creator-node';
import * as fs from 'fs';
import { format } from 'date-fns';

@Injectable()
export class FormularioPracticaService {

    // Variables para desarrollo

    public url_logo = 'http://localhost:' + (process.env.PORT  || 3000) + '/pdf/logo.png';
    public url_template_auto = process.env.URL_TEMPLATE_FORMULARIO_AUTO || './pdf/template/formulario_auto.html';
    public url_template_moto = process.env.URL_TEMPLATE_FORMULARIO_MOTO || './pdf/template/formulario_moto.html';
    public url_destino_pdf_auto = process.env.URL_DESTINO_PDF_AUTO || './public/pdf/formulario_auto.pdf';
    public url_destino_pdf_moto = process.env.URL_DESTINO_PDF_MOTO || './public/pdf/formulario_moto.pdf';

    // Variables para produccion

    // public url_logo = 'http://localhost:3000/pdf/logo.png';
    // public url_template_auto = '../pdf/template/formulario_auto.html';
    // public url_template_moto = '../pdf/template/formulario_moto.html';
    // public url_destino_pdf_auto = '../public/pdf/formulario_auto.pdf';
    // public url_destino_pdf_moto = '../public/pdf/formulario_moto.pdf';
    

    constructor(
        @InjectModel('Formulario-practica') private readonly formularioPracticaModel: Model<IFormularioPractica>,
    ){}

    // Formulario por ID
    async getFormulario(id: string): Promise<IFormularioPractica> {
        const formularioPractica = await this.formularioPracticaModel.findById(id);
        if(!formularioPractica) throw new NotFoundException('El formulario no existe');
        return formularioPractica;
    }  
    
    // Listar formularios
    async listarFormularios(querys: any): Promise<IFormularioPractica[]> {
        
        const {columna, direccion} = querys;

        const pipeline = [];
        pipeline.push({$match:{}})

        // Join ()
        pipeline.push(
            { $lookup: { // Lookup - Personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({$sort: ordenar});
        }

        const formularios = await this.formularioPracticaModel.aggregate(pipeline);

        return formularios;

    }

    // Listar formularios por lugar
    async listarFormulariosPorLugar(id: string, querys: any): Promise<IFormularioPractica[]> {
        
        const {columna, direccion} = querys;

        const pipeline = [];
        
        const idLugar = new mongoose.Types.ObjectId(id); 
       
        // Busqueda por ID
        pipeline.push({$match:{ lugar: idLugar }});

        // Join ()
        pipeline.push(
            { $lookup: { // Lookup - Personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({$sort: ordenar});
        }

        const formularios = await this.formularioPracticaModel.aggregate(pipeline);

        return formularios;

    } 
    
    // Limpiar formularios activos
    async limpiarFormularios(): Promise<IFormularioPractica[]> {

        const pipeline = [];

        const fechaHoy = new Date();

        pipeline.push({$match: { activo: true }});

        // Se listan los formularios antiguos
        pipeline.push({$match:{ createdAt: { $lte: new Date(format(fechaHoy, 'yyyy-MM-dd')) } }});
        const formularios = await this.formularioPracticaModel.aggregate(pipeline);

        // Se dan de baja a los formularios listados        
        if(formularios.length !== 0){
            formularios.forEach( async formulario => {
                await this.formularioPracticaModel.findByIdAndUpdate(formulario._id, { activo: false });
            })
        }

        return formularios;

    }


    // Imprimir formulario
    async imprimirFormulario(data: any) {

        const { nro_tramite, nro_formulario, fecha, apellido, nombre, dni, tipo } = data;

        // Generacion de PDF

        // Se trae el template
        
        var html = tipo === 'Auto' ? fs.readFileSync(this.url_template_auto, 'utf-8') : fs.readFileSync(this.url_template_moto, 'utf-8');

        // Opciones de documento
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            footer: {
                height: "28mm",
                contents: {}
            }
        };

        // Configuracion de documento
        var document = {
            html: html,
            data: {
                url_logo: this.url_logo,
                nro_formulario,
                nro_tramite,
                apellido,
                nombre,
                dni,
                fecha: format(new Date(fecha),'dd/MM/yyyy')
            },
            path: tipo === 'Auto' ? this.url_destino_pdf_auto : this.url_destino_pdf_moto,
            type: "",
        };
        
        // Generacion del PDF
        await pdf.create(document, options);

        return 'Formulario generado';

    }

    // Crear formulario
    async crearFormulario(formularioPracticaDTO: FormularioPracticaDTO, querys: any): Promise<IFormularioPractica> { 

        const { nro_tramite, apellido, nombre, dni, tipo } = querys;

        // Se determina si hay formularios cargados en sistema
        const formularios = await this.listarFormularios({columna: 'createdAt', direccion: -1});

        let nro_formulario = 0;
        let nro_formulario_string = '';

        if(formularios.length === 0){
            nro_formulario = 1;
            nro_formulario_string = '000001';
        }else{
            nro_formulario = formularios[0].nro_formulario + 1;
            if(nro_formulario < 10) nro_formulario_string = '00000' + nro_formulario.toString();
            else if(nro_formulario < 100) nro_formulario_string = '0000' + nro_formulario.toString();
            else if(nro_formulario < 1000) nro_formulario_string = '000' + nro_formulario.toString();
            else if(nro_formulario < 10000) nro_formulario_string = '00' + nro_formulario.toString();
            else if(nro_formulario < 100000) nro_formulario_string = '0' + nro_formulario.toString();
        }
        
        // Generacion de PDF

        // Se trae el template
        
        var html = tipo === 'Auto' ? fs.readFileSync(this.url_template_auto, 'utf-8') : fs.readFileSync(this.url_template_moto, 'utf-8');

        // Opciones de documento
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            footer: {
                height: "28mm",
                contents: {}
            }
        };

        // Configuracion de documento
        var document = {
            html: html,
            data: {
                url_logo: this.url_logo,
                nro_formulario: nro_formulario_string,
                nro_tramite,
                apellido,
                nombre,
                dni,
                fecha: format(new Date(),'dd/MM/yyyy')
            },
            path: tipo === 'Auto' ? this.url_destino_pdf_auto : this.url_destino_pdf_moto,
            type: "",
        };
        
        // Generacion del PDF
        await pdf.create(document, options);

        const data = {...formularioPracticaDTO, nro_formulario, nro_formulario_string};
        const formulario = new this.formularioPracticaModel(data);
        return await formulario.save();

    }

    // Actualizar formulario
    async actualizarFormulario(id: string, formularioPracticaUpdateDTO: FormularioPracticaUpdateDTO): Promise<IFormularioPractica> {        
        const formulario = await this.formularioPracticaModel.findByIdAndUpdate(id, formularioPracticaUpdateDTO, {new: true});
        return formulario;
    }

}
