import { IsBoolean, IsEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class PersonaUpdateDTO {
    
    readonly apellido: string;
    
    readonly nombre: string;
   
    readonly dni: string;

    readonly userUpdator: string;

    readonly userCreator: string;
    
    readonly activo: boolean;
}