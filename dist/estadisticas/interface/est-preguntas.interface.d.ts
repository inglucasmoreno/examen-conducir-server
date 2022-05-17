import { Document } from 'mongoose';
export interface IEstPreguntas extends Document {
    readonly examen: string;
    readonly pregunta: string;
    readonly correcta: boolean;
}
