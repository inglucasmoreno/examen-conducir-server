import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreguntaUpdateDTO } from './dto/preguntas-update.dto';
import { PreguntaDTO } from './dto/preguntas.dto';
import { IPregunta } from './interface/preguntas.interface';

@Injectable()
export class PreguntasService {

    constructor(@InjectModel('Pregunta') private readonly preguntasModel: Model<IPregunta>){}

    // Pregunta por ID
    async getPregunta(id: string): Promise<IPregunta> {
        const pregunta = await this.preguntasModel.findById(id);
        if(!pregunta) throw new NotFoundException('La pregunta no existe');
        return pregunta;
    }  
    
    // Listar preguntas
    async listarPreguntas(querys: any): Promise<IPregunta[]> {

        const {columna, direccion} = querys;

        // Ordenar
        let ordenar = [columna || 'apellido', direccion || 1];     

        const preguntas = await this.preguntasModel.find().sort([ordenar]);
        return preguntas;
    }  

    // Crear pregunta
    async crearPregunta(preguntaDTO: PreguntaDTO): Promise<IPregunta> {
        
        const preguntas = await this.preguntasModel.find().sort({'numero': -1});

        if(preguntas.length !== 0){
            preguntaDTO.numero = preguntas[0].numero + 1;
        }else{
            preguntaDTO.numero = 1;
        }

        const pregunta = new this.preguntasModel(preguntaDTO);
        return await pregunta.save();
    }

    // Actualizar pregunta
    async actualizarPregunta(id: string, preguntaUpdateDTO: PreguntaUpdateDTO): Promise<IPregunta> {

        // Se verifica si la pregunta a actualizar existe
        const preguntaExiste = await this.getPregunta(id);
        if(!preguntaExiste) throw new NotFoundException('La pregunta no existe');

        const pregunta = await this.preguntasModel.findByIdAndUpdate(id, preguntaUpdateDTO, {new: true});
        return pregunta;
    
    }

}
