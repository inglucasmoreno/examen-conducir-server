import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { add } from 'date-fns';
import { Model } from 'mongoose';
import { IEstPreguntas } from './interface/est-preguntas.interface';

@Injectable()
export class EstadisticasService {

    constructor(@InjectModel('Est-preguntas') private readonly estPreguntasModel: Model<IEstPreguntas>) { }

    // Estadisticas de preguntas
    async preguntas(querys: any): Promise<any> {

        const {
            columna,
            direccion,
            desde,
            registerpp,
            activo,
            parametro,
            fechaDesde,
            fechaHasta
        } = querys;

        // Filtrado
        let pipeline = [];
        // let pipelineTotal = [];

        pipeline.push({ $match: {} });
        // pipelineTotal.push({ $match: {} });

        // Filtro - Fecha desde
        if (fechaDesde && fechaDesde.trim() !== '') {
            pipeline.push({
                $match: {
                    createdAt: { $gte: add(new Date(fechaDesde), { hours: 0 }) }
                }
            });
        }

        // Filtro - Fecha hasta
        if (fechaHasta && fechaHasta.trim() !== '') {
            pipeline.push({
                $match: {
                    createdAt: { $lte: add(new Date(fechaHasta), { days: 1, hours: 0 }) }
                }
            });
        }

        // Join con preguntas
        pipeline.push({
            $lookup: {
                from: 'preguntas',
                localField: 'pregunta',
                foreignField: '_id',
                as: 'pregunta'
            }
        });
        pipeline.push({ $unwind: '$pregunta' });

        // pipelineTotal.push({
        //     $lookup: {
        //         from: 'preguntas',
        //         localField: 'pregunta',
        //         foreignField: '_id',
        //         as: 'pregunta'
        //     }
        // });
        // pipelineTotal.push({$unwind: '$pregunta'}); 

        // Filtro por parametros
        // if (parametro && parametro !== '') {

        //     const porPartes = parametro.split(' ');
        //     let parametroFinal = '';

        //     for (var i = 0; i < porPartes.length; i++) {
        //         if (i > 0) parametroFinal = parametroFinal + porPartes[i] + '.*';
        //         else parametroFinal = porPartes[i] + '.*';
        //     }

        //     const regex = new RegExp(parametroFinal, 'i');
        //     pipeline.push({ $match: { $or: [{ 'pregunta.numero': Number(parametro) }, { 'pregunta.descripcion': regex }] } });
        //     // pipelineTotal.push({ $match: { $or: [{ 'pregunta.numero': Number(parametro) }, { 'pregunta.descripcion': regex } ] } });

        // }

        // GROUP
        pipeline.push({
            $group: {
                _id: { pregunta: "$pregunta" },
                cantidad_correctas: { $sum: { $cond: [{ $eq: ["$correcta", true] }, 1, 0] } },
                cantidad_incorrectas: { $sum: { $cond: [{ $eq: ["$correcta", false] }, 1, 0] } },
                cantidad_total: { $sum: 1 }
            }
        });

        // pipelineTotal.push({
        //     $group: { 
        //         _id: { pregunta: "$pregunta" },
        //         cantidad_correctas: { $sum: { $cond: [ { $eq: [ "$correcta", true ] }, 1, 0 ] } },
        //         cantidad_incorrectas: { $sum: { $cond: [ { $eq: [ "$correcta", false ] }, 1, 0 ] } },
        //         cantidad_total: { $sum: 1 }     
        //     }
        // });

        // Ordenando datos
        const ordenar: any = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }

        // Paginacion
        pipeline.push({ $skip: Number(desde) }, { $limit: Number(registerpp) });        

        const [estadisticas] = await Promise.all([
            this.estPreguntasModel.aggregate(pipeline),
        ]);

        // Se genera el procentaje
        // estadisticas.map( estadistica => {
        //     estadistica.porcentaje_correctas = (estadistica.cantidad_correctas / estadistica.cantidad_total) * 100; 
        //     estadistica.porcentaje_incorrectas = (estadistica.cantidad_incorrectas / estadistica.cantidad_total) * 100; 
        // })

        // if(columna === 'porcentaje_correctas' && direccion === '-1'){
        //     estadisticas.sort(function (a, b) {
        //         // A va primero que B
        //         if (a.porcentaje_correctas < b.porcentaje_correctas)
        //           return -1;
        //         // B va primero que A
        //         else if (a.porcentajcorrectas > b.porcentaje_correctas)
        //           return 1;
        //         // A y B son iguales
        //         else
        //           return 0;
        //       });
        // } 
        // else if(columna === 'porcentaje_correctas' && direccion === '1'){
        //     estadisticas.sort(function (a, b) {
        //         // A va primero que B
        //         if (a.porcentaje_correctas > b.porcentaje_correctas)
        //           return -1;
        //         // B va primero que A
        //         else if (a.porcentaje_correctas < b.porcentaje_correctas)
        //           return 1;
        //         // A y B son iguales
        //         else
        //           return 0;
        //       });
        // }
        // else if(columna === 'porcentaje_incorrectas' && direccion === '-1'){
        //     estadisticas.sort(function (a, b) {
        //         // A va primero que B
        //         if (a.porcentaje_incorrectas < b.porcentaje_incorrectas)
        //           return -1;
        //         // B va primero que A
        //         else if (a.porcentaje_incorrectas > b.porcentaje_incorrectas)
        //           return 1;
        //         // A y B son iguales
        //         else
        //           return 0;
        //       });
        // }
        // else if(columna === 'porcentaje_incorrectas' && direccion === '1'){
        //     estadisticas.sort(function (a, b) {
        //         // A va primero que B
        //         if (a.porcentaje_incorrectas > b.porcentaje_incorrectas)
        //           return -1;
        //         // B va primero que A
        //         else if (a.porcentaje_incorrectas < b.porcentaje_incorrectas)
        //           return 1;
        //         // A y B son iguales
        //         else
        //           return 0;
        //       });
        // }

        return {
            estadisticas,
            totalItems: estadisticas.length
        }

    }

}
