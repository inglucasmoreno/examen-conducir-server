import { IsNotEmpty } from "class-validator"

export class EstPreguntaDTO {
    
    @IsNotEmpty()
    readonly examen: string;

    @IsNotEmpty()
    readonly pregunta: string;
    
    @IsNotEmpty()
    readonly correcta: boolean;

}