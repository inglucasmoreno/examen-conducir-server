import { Document } from 'mongoose';

export interface IFormularioPractica extends Document {
    readonly nro_formulario: number;
    readonly nro_formulario_string: string;
    readonly nro_tramite: string;
    readonly lugar: string;
    readonly persona: string;
    readonly tipo: string;
    readonly activo: boolean;
}
