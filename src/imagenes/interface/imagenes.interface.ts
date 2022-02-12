import { Document } from 'mongoose';

export interface IImagen extends Document {
    
    readonly descripcion: string;

    readonly url: string;
    
    readonly activo: boolean;

}
