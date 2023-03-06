import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEstPreguntas } from './interface/est-preguntas.interface';

@Injectable()
export class EstadisticasService {

    constructor(@InjectModel('Est-preguntas') private readonly estPreguntasModel: Model<IEstPreguntas>){}
  
    // Estadisticas de preguntas
    async preguntas(querys: any): Promise<any> {
                
        const {
            columna,
            direccion,
            desde,
            registerpp,
            activo,
            parametro,
        } = querys;

        // Filtrado
        let pipeline = [];
        let pipelineTotal = [];

        pipeline.push({ $match: {} });
        pipelineTotal.push({ $match: {} });

        // Activo / Inactivo
        let filtroActivo = {};
        if (activo && activo !== '') {
            filtroActivo = { activo: activo === 'true' ? true : false };
            pipeline.push({ $match: filtroActivo });
            pipelineTotal.push({ $match: filtroActivo });
        }

        // Join con examenes
        pipeline.push({
            $lookup: {
                from: 'examenes',
                localField: 'examen',
                foreignField: '_id',
                as: 'examen'
            }
        });
        pipeline.push({$unwind: '$examen'}); 
        
        // Join con preguntas
        pipeline.push({
            $lookup: {
                from: 'preguntas',
                localField: 'pregunta',
                foreignField: '_id',
                as: 'pregunta'
            }
        });
        pipeline.push({$unwind: '$pregunta'}); 

        pipelineTotal.push({
            $lookup: {
                from: 'preguntas',
                localField: 'pregunta',
                foreignField: '_id',
                as: 'pregunta'
            }
        });
        pipelineTotal.push({$unwind: '$pregunta'}); 

        // Filtro por parametros
        if (parametro && parametro !== '') {

            const porPartes = parametro.split(' ');
            let parametroFinal = '';

            for (var i = 0; i < porPartes.length; i++) {
                if (i > 0) parametroFinal = parametroFinal + porPartes[i] + '.*';
                else parametroFinal = porPartes[i] + '.*';
            }

            const regex = new RegExp(parametroFinal, 'i');
            pipeline.push({ $match: { $or: [{ 'pregunta.numero': Number(parametro) }, { 'pregunta.descripcion': regex }] } });
            pipelineTotal.push({ $match: { $or: [{ 'pregunta.numero': Number(parametro) }, { 'pregunta.descripcion': regex } ] } });

        }

        // GROUP
        pipeline.push({
            $group: { 
                _id: { pregunta: "$pregunta" },
                cantidad_correctas: { $sum: { $cond: [ { $eq: [ "$correcta", true ] }, 1, 0 ] } },
                cantidad_incorrectas: { $sum: { $cond: [ { $eq: [ "$correcta", false ] }, 1, 0 ] } },
                cantidad_total: { $sum: 1 }     
            }
        });

        pipelineTotal.push({
            $group: { 
                _id: { pregunta: "$pregunta" },
                cantidad_correctas: { $sum: { $cond: [ { $eq: [ "$correcta", true ] }, 1, 0 ] } },
                cantidad_incorrectas: { $sum: { $cond: [ { $eq: [ "$correcta", false ] }, 1, 0 ] } },
                cantidad_total: { $sum: 1 }     
            }
        });

        // Ordenando datos
        const ordenar: any = {};
        if(columna){
            ordenar[String(columna)] = Number(direccion); 
            pipeline.push({$sort: ordenar});
        } 

        // Paginacion
        pipeline.push({ $skip: Number(desde) }, { $limit: Number(registerpp) });

        const [estadisticas, estadisticasTotal] = await Promise.all([
            this.estPreguntasModel.aggregate(pipeline),
            this.estPreguntasModel.aggregate(pipelineTotal),
        ]);
        
        return {
            estadisticas,
            totalItems: estadisticasTotal.length
        }

    }

}
