import { IsString } from "class-validator";

export class PersonaDTO {

    @IsString()
    readonly apellido: string;
    
    @IsString()
    readonly nombre: string;

    @IsString()
    readonly dni: string;

    readonly sigem: boolean;

    @IsString()
    readonly userCreator: string;

    @IsString()
    readonly userUpdator: string;
    
    readonly activo: boolean;
}