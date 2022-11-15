import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreguntaUpdateDTO } from './dto/preguntas-update.dto';
import { PreguntaDTO } from './dto/preguntas.dto';
import { IPregunta } from './interface/preguntas.interface';

@Injectable()
export class PreguntasService {

    constructor(@InjectModel('Pregunta') private readonly preguntasModel: Model<IPregunta>) { }

    // Pregunta por ID
    async getPregunta(id: string): Promise<IPregunta> {
        const pregunta = await this.preguntasModel.findById(id);
        if (!pregunta) throw new NotFoundException('La pregunta no existe');
        return pregunta;
    }

    // Listar preguntas
    async listarPreguntas(querys: any): Promise<any> {

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

        // Filtro por parametros
        if (parametro && parametro !== '') {

            const porPartes = parametro.split(' ');
            let parametroFinal = '';

            for (var i = 0; i < porPartes.length; i++) {
                if (i > 0) parametroFinal = parametroFinal + porPartes[i] + '.*';
                else parametroFinal = porPartes[i] + '.*';
            }

            const regex = new RegExp(parametroFinal, 'i');
            pipeline.push({ $match: { $or: [{ numero: Number(parametro) }, { descripcion: regex } ] } });
            pipelineTotal.push({ $match: { $or: [{ numero: Number(parametro) }, { descripcion: regex } ] } });

        }

        // Ordenando datos
        const ordenar: any = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }

        // Paginacion
        pipeline.push({ $skip: Number(desde) }, { $limit: Number(registerpp) });

        const [preguntas, preguntasTotal] = await Promise.all([
            this.preguntasModel.aggregate(pipeline),
            this.preguntasModel.aggregate(pipelineTotal),
        ]);
        
        return {
            preguntas,
            totalItems: preguntasTotal.length
        }
    }

    // Crear pregunta
    async crearPregunta(preguntaDTO: PreguntaDTO): Promise<IPregunta> {

        const preguntas = await this.preguntasModel
                                    .find()
                                    .sort({ 'numero': -1 })
                                    .limit(1);

        if (preguntas.length !== 0) preguntaDTO.numero = preguntas[0].numero + 1;
        else preguntaDTO.numero = 1;

        const pregunta = new this.preguntasModel(preguntaDTO);
        return await pregunta.save();
    
    }

    // Actualizar pregunta
    async actualizarPregunta(id: string, preguntaUpdateDTO: PreguntaUpdateDTO): Promise<IPregunta> {

        // Se verifica si la pregunta a actualizar existe
        const preguntaExiste = await this.getPregunta(id);
        if (!preguntaExiste) throw new NotFoundException('La pregunta no existe');

        const pregunta = await this.preguntasModel.findByIdAndUpdate(id, preguntaUpdateDTO, { new: true });
        return pregunta;

    }

}
