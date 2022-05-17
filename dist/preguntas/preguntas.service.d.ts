import { Model } from 'mongoose';
import { PreguntaUpdateDTO } from './dto/preguntas-update.dto';
import { PreguntaDTO } from './dto/preguntas.dto';
import { IPregunta } from './interface/preguntas.interface';
export declare class PreguntasService {
    private readonly preguntasModel;
    constructor(preguntasModel: Model<IPregunta>);
    getPregunta(id: string): Promise<IPregunta>;
    listarPreguntas(querys: any): Promise<IPregunta[]>;
    crearPregunta(preguntaDTO: PreguntaDTO): Promise<IPregunta>;
    actualizarPregunta(id: string, preguntaUpdateDTO: PreguntaUpdateDTO): Promise<IPregunta>;
}
