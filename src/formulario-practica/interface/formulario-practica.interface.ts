import { Document } from 'mongoose';

export interface IFormularioPractica extends Document {
    readonly nro_formulario: string;
    readonly nro_tramite: string;
    readonly persona: string;
    readonly tipo: string;
    readonly activo: boolean;
}
