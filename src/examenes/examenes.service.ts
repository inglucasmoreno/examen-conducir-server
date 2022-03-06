import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose  from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamenDTO } from './dto/examenes.dto';
import { IExamen } from './interface/examenes.interface';
import { IPregunta } from 'src/preguntas/interface/preguntas.interface';
import { IEstPreguntas } from 'src/estadisticas/interface/est-preguntas.interface';
import { IRectivacion } from './interface/reactivaciones.interface';
import { add, format } from 'date-fns';

@Injectable()
export class ExamenesService {

    constructor(@InjectModel('Examen') private readonly examenModel: Model<IExamen>,
                @InjectModel('Est-preguntas') private readonly estPreguntasModel: Model<IEstPreguntas>,
                @InjectModel('Reactivacion') private readonly reactivacionModel: Model<IRectivacion>,
                @InjectModel('Pregunta') private readonly preguntaModel: Model<IPregunta>){}

    // Examen por ID
    async getExamen(id: string, activo: string): Promise<any> {

        const idObject = new mongoose.Types.ObjectId(id);
        const pipeline = [];

        // Busqueda por ID
        pipeline.push({$match:{ _id: idObject }});

        // Busqueda por activo/inactivo
        if(activo === 'true'){
            pipeline.push({$match:{ activo: true }});
        }else if(activo === 'false'){
            pipeline.push({$match:{ activo: false }});
        }

        // Join (lugar)
        pipeline.push(
            { $lookup: { // Lookup - Lugar
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }},
        );
        pipeline.push({ $unwind: '$lugar' });

        // Join (personas)
        pipeline.push(
            { $lookup: { // Lookup - personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        // Join (usuarios)
        pipeline.push(
            { $lookup: { // Lookup - usuarios
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }},
        );
        pipeline.push({ $unwind: '$usuario' });

        const examen = await this.examenModel.aggregate(pipeline);

        if(!examen[0]) throw new NotFoundException('El examen no existe');
        return examen[0];

    }

    // Examen por DNI
    async getExamenDni(dni: string): Promise<any> {

        const pipeline = [];

        // Filtramos por Activo/Inactivo
        pipeline.push({ $match: { activo: true } });

        // Join (lugar)
        pipeline.push(
            { $lookup: { // Lookup - Lugar
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }},
        );
        pipeline.push({ $unwind: '$lugar' });

        // Join (personas)
        pipeline.push(
            { $lookup: { // Lookup - personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        // Join (usuarios)
        pipeline.push(
            { $lookup: { // Lookup - usuarios
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }},
        );
        pipeline.push({ $unwind: '$usuario' });

        // Filtramos por DNI de persona
        pipeline.push({ $match: { 'persona.dni': dni } });

        const examen = await this.examenModel.aggregate(pipeline);

        if(!examen[0]) throw new NotFoundException('El examen no existe');
        return examen[0];

    }

    // Examen por persona
    async getExamenPersona(persona: string): Promise<any> {

        const pipeline = [];

        // Filtramos por Activo/Inactivo
        pipeline.push({ $match: { activo: true } });

        // Filtramos por persona
        const personaObject = new mongoose.Types.ObjectId(persona);
        pipeline.push({$match:{ persona: personaObject }});

        // Join (lugar)
        pipeline.push(
            { $lookup: { // Lookup - Lugar
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }},
        );
        pipeline.push({ $unwind: '$lugar' });

        // Join (personas)
        pipeline.push(
            { $lookup: { // Lookup - personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        // Join (usuarios)
        pipeline.push(
            { $lookup: { // Lookup - usuarios
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }},
        );
        pipeline.push({ $unwind: '$usuario' });

        const examen = await this.examenModel.aggregate(pipeline);

        // if(!examen[0]) throw new NotFoundException('El examen no existe');
        return examen[0];

    }

    // Listar examenes historial
    async listarExamenesHistorial(querys: any, data: any): Promise<IExamen[]> {

        // Parametros - Ordenamiento
        const {columna, direccion } = querys;

        // Body - Datos de busqueda
        const { fechaDesde, fechaHasta, lugar, estado, clase, usuario, persona } = data;

        const pipeline = [];

        // Filtro - Intervalo de fechas
        if(fechaDesde?.trim() !== '') pipeline.push({$match: { createdAt: { $gte: new Date(fechaDesde) } }});
        if(fechaHasta?.trim() !== '') pipeline.push({$match: { createdAt: { $lte: new Date(add(new Date(fechaHasta), { days: 1 })) } }});

        // Filtro - Lugar de creacion
        if(lugar.trim() !== ''){
            console.log(lugar);
            let idLugar: any = '';
            idLugar = new mongoose.Types.ObjectId(lugar);
            pipeline.push({$match: { lugar: idLugar }});
        }

        // Filtro - Estado de examen
        if(estado && estado !== '')pipeline.push({$match: { estado }});

        // Filtro - Tipo de licencia
        if(clase && clase !== '')pipeline.push({$match: { tipo_licencia: clase }});

        // Join (lugar)
        pipeline.push(
            { $lookup: { // Lookup - Lugar
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }},
        );
        pipeline.push({ $unwind: '$lugar' });

        // Join (personas)
        pipeline.push(
            { $lookup: { // Lookup - personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        pipeline.push(
        // Join (usuarios)
            { $lookup: { // Lookup - usuarios
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }},
        );
        pipeline.push({ $unwind: '$usuario' });

        // Filtro - Usuarios (DNI)
        if( usuario && usuario.trim() !== '') pipeline.push({$match: { 'usuario.dni': usuario }});

         // Filtro - Destino de examen (DNI)
         if( persona && persona.trim() !== '') pipeline.push({$match: { 'persona.dni': persona }});

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({$sort: ordenar});
        }

        const examenes = await this.examenModel.aggregate(pipeline);

        return examenes;

    }


    // Listar examenes del dia de hoy
    async listarExamenes(querys: any): Promise<IExamen[]> {

        const {columna, direccion, lugar} = querys;

        let idLugar: any = '';
        const pipeline = [];

        // Filtro por fecha -> Hoy
        const fechaDesde = new Date(format(new Date(),'MM/dd/yyyy')); // Fecha de hoy
        const fechaHasta = add(new Date(fechaDesde), {days: 1}); // Fecha de hoy + 1 dia

        pipeline.push({$match: { createdAt: { $gte: fechaDesde } }});
        pipeline.push({$match: { createdAt: { $lte: new Date(fechaHasta) } }});

        // Se filtra por lugar si es necesario
        if(lugar !== '') idLugar = new mongoose.Types.ObjectId(lugar);
        if(lugar !== ''){ pipeline.push({$match: { lugar: idLugar }}); }

        // Join (lugar)
        pipeline.push(
            { $lookup: { // Lookup - Lugar
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }},
        );
        pipeline.push({ $unwind: '$lugar' });

        // Join (personas)
        pipeline.push(
            { $lookup: { // Lookup - personas
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }},
        );
        pipeline.push({ $unwind: '$persona' });

        // Join (usuarios)
        pipeline.push(
            { $lookup: { // Lookup - usuarios
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }},
        );
        pipeline.push({ $unwind: '$usuario' });

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({$sort: ordenar});
        }

        const examenes = await this.examenModel.aggregate(pipeline);

        return examenes;

    }

    // Generar examen - Revisar: Preguntas aleatorias
    async crearExamen(examenDTO: ExamenDTO): Promise<string> {

        let preguntasExamen: any = [];

        const regex = new RegExp(examenDTO.tipo_licencia); // Expresion regular sin barras - La real seria /D/ por ejemplo

        // Se arma el arreglo de preguntas totales dependiendo de la licencia
        let preguntas = await this.preguntaModel.find({alcance: regex, activo: true});

        // Cantidad de preguntas dependiendo del tipo de examen
        // Examen particular (A y B) = 50 preguntas | Examen profesional (C y D) = 60 preguntas

        let cantidadPreguntas: number = 0;

        if(examenDTO.tipo_licencia === 'A' || examenDTO.tipo_licencia === 'B') cantidadPreguntas = 50;
        else cantidadPreguntas = 60;

        let cantidadTotal = preguntas.length;

        // Se arma el arreglo definitivo
        for(var i = 0; i < cantidadPreguntas; i++){

            const nroAleatorio = Math.floor(Math.random() * cantidadTotal); // Numero aleatorio [0 - preguntas.length]

            // Se obtiene la pregunta aleatoria
            const randomElement: any = preguntas[nroAleatorio];

            preguntas.splice(nroAleatorio, 1);    // Se elimina la pregunta para que no pueda volver a tocar
            cantidadTotal -= 1;                   // Se decrementa en 1 la cantidad total de preguntas (Porque se elimina una del arreglo en la linea anterior)

            randomElement.numero = i + 1;

            // Se agrega al arreglo
            preguntasExamen.push(randomElement);

        }

        let data: any = examenDTO;
        data.preguntas = preguntasExamen;

        // Se Genera y almacena el examen en la Base de datos
        const examen = new this.examenModel(examenDTO);
        await examen.save();

        return 'Examen generado correctamente';
    }

    // Actualizar examen
    async actualizarExamen(id: string, examenUpdateDTO: any): Promise<IExamen> {
        const examen = await this.examenModel.findByIdAndUpdate(id, examenUpdateDTO, {new: true});
        return examen;
    }

    // Listar examenes
    async listarReactivaciones(examenID: any, querys: any): Promise<IExamen[]> {

        const {columna, direccion} = querys;

        const pipeline = [];
        pipeline.push({$match: { examen: new mongoose.Types.ObjectId(examenID) }});

        // Join (usuarios)
        pipeline.push(
            { $lookup: { // Lookup - usuarios
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }},
        );
        pipeline.push({ $unwind: '$usuario' });

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({$sort: ordenar});
        }

        const reactivaciones = await this.reactivacionModel.aggregate(pipeline);

        return reactivaciones;

    }

    // Reactivar examen
    async reactivarExamen(id: string, examenUpdateDTO: any): Promise<IExamen> {

        const { usuario, persona, tiempo, motivo } = examenUpdateDTO;

        // Se verifica si no hay un examen activo para esta persona
        const examenExiste = await this.examenModel.findOne({ persona, activo: true });

        // console.log(examenExiste);
        if(examenExiste) throw new NotFoundException('Ya existe un examen habilitado para esta persona');

        // Actualizacion de datos de examen
        const examen = await this.examenModel.findByIdAndUpdate(id, examenUpdateDTO, {new: true});

        // Se crea documento en tabla de reactivacion de examenes
        const reactivacion = new this.reactivacionModel({
            examen: id,
            usuario,
            motivo,
            tiempo,
        });

        await reactivacion.save();

        return examen;
    }

    // Finalizar examen
    async finalizarExamen(id: string, examenUpdateDTO: any): Promise<IExamen> {

        const examenDB = await this.getExamen(id, '');

        // Se calcula el resultado del examen
         var cantidad_correctas = 0;
         var cantidad_incorrectas = 0;

         // Se recorren las preguntas
         examenUpdateDTO.preguntas.forEach( async pregunta => {

            const correcta = pregunta.seleccionada === 'respuesta_correcta';

            // Calculo de correcta e incorrectas
            correcta ? cantidad_correctas += 1 : cantidad_incorrectas += 1;

            const estPregunta = new this.estPreguntasModel({
                examen: id,
                pregunta: pregunta._id,
                correcta
            });

            estPregunta.save();

        });

         if((examenDB.tipo_licencia === 'A' || examenDB.tipo_licencia === 'B') && cantidad_correctas >= 40) examenUpdateDTO.aprobado = true; // (40/50 == 80%)
         if((examenDB.tipo_licencia === 'C' || examenDB.tipo_licencia === 'D' || examenDB.tipo_licencia === 'E' || examenDB.tipo_licencia === 'F' || examenDB.tipo_licencia === 'G' || examenDB.tipo_licencia === 'H') && cantidad_correctas >= 54) examenUpdateDTO.aprobado = true; // (54/60 == 90%)

         examenUpdateDTO.cantidad_respuestas_correctas = cantidad_correctas;
         examenUpdateDTO.cantidad_respuestas_incorrectas = cantidad_incorrectas;

         return examenUpdateDTO;

    }

    // Eliminar examen
    async eliminarExamen(id: string): Promise<IExamen> {

        // Se verifica que el examen este activo antes de eliminarlo
        const examenBD = await this.examenModel.findById(id);

        if(!examenBD.activo) throw new NotFoundException('El examen ya fue presentado, no puedes eliminarlo');

        // Se genera el examen y se almacena en la Base de datosw
        const examen = await this.examenModel.findByIdAndRemove(id);
        return examen;
    }

}
