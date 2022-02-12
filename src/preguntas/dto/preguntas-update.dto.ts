import { IsString } from "class-validator";

export class PreguntaUpdateDTO {
    
    readonly descripcion: string;

    imagen: string;

    pregunta_img: boolean;

    url_img: string;
    
    numero: number;
    
    readonly frecuencia: number;
    
    readonly respuesta_correcta: string; 
    
    readonly respuesta_incorrecta_1: string;

    readonly respuesta_incorrecta_2: string;

    readonly alcance: string;

    readonly activo: boolean;
}