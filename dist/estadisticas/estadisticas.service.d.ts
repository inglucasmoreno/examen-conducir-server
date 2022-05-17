import { Model } from 'mongoose';
import { IEstPreguntas } from './interface/est-preguntas.interface';
export declare class EstadisticasService {
    private readonly estPreguntasModel;
    constructor(estPreguntasModel: Model<IEstPreguntas>);
    preguntas(querys: any): Promise<IEstPreguntas[]>;
}
