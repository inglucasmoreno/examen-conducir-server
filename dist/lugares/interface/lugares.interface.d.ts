import { Document } from 'mongoose';
export interface ILugar extends Document {
    readonly descripcion: string;
    readonly activo: boolean;
}
