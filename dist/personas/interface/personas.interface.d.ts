import { Document } from 'mongoose';
export interface IPersona extends Document {
    readonly apellido: string;
    readonly nombre: string;
    readonly dni: string;
    readonly userCreator: string;
    readonly userUpdator: string;
    readonly activo: boolean;
}
