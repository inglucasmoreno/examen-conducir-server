import { Document } from 'mongoose';
export interface IPregunta extends Document {
    readonly descripcion: string;
    readonly pregunta_img: boolean;
    readonly imagen: string;
    readonly url_img: string;
    readonly numero: number;
    readonly frecuencia: number;
    readonly respuestas_correcta: string;
    readonly respuestas_incorrecta_1: string;
    readonly respuestas_incorrecta_2: string;
    readonly alcance: string;
    readonly activo: boolean;
}
