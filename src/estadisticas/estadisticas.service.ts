import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IEstPreguntas } from './interface/est-preguntas.interface';

@Injectable()
export class EstadisticasService {

    constructor(@InjectModel('Est-preguntas') private readonly estPreguntasModel: Model<IEstPreguntas>){}
  
    // Estadisticas de preguntas
    async preguntas(querys: any): Promise<IEstPreguntas[]> {
                
        const {columna, direccion} = querys;

        const pipeline = [];

        pipeline.push({ $match: { } });

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

        // GROUP
        pipeline.push({
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

        const estadisticas = await this.estPreguntasModel.aggregate(pipeline);
        return estadisticas;
    }

}
