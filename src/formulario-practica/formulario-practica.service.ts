import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormularioPracticaUpdateDTO } from './dto/formulario-practica-update.dto';
import { FormularioPracticaDTO } from './dto/formulario-practica.dto';
import { IFormularioPractica } from './interface/formulario-practica.interface';
import * as pdf from 'pdf-creator-node';
import * as fs from 'fs';

@Injectable()
export class FormularioPracticaService {

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

    // Crear formulario
    async crearFormulario(formularioPracticaDTO: FormularioPracticaDTO): Promise<IFormularioPractica> { 

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
        var html = fs.readFileSync('pdf/template/formulario.html', 'utf-8');

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
                title: 'Documentacion de prueba'
            },
            path: `./docs/formulario.pdf`,
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
