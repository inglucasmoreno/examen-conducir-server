import { Document } from 'mongoose';

export interface IRectivacion extends Document {

    readonly _id: string;

    readonly examen: string;

    readonly usuario: string;

    readonly motivo: string;

    readonly tiempo: number;

    readonly activo: boolean;

}
