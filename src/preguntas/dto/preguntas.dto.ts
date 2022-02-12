import { IsString } from "class-validator";

export class PreguntaDTO {
    
    @IsString()
    readonly descripcion: string;

    readonly imagen: string;

    readonly pregunta_img: boolean;

    readonly url_img: string;

    numero: number;
    
    readonly frecuencia: number;
    
    @IsString()
    readonly respuesta_correcta: string; 
    
    @IsString()
    readonly respuesta_incorrecta_1: string;

    @IsString()
    readonly respuesta_incorrecta_2: string;

    @IsString()
    readonly alcance: string;

    readonly activo: boolean;
    
}