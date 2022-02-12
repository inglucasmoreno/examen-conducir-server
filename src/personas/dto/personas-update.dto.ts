import { IsBoolean, IsEmail, IsNotEmpty, IsString, isString } from "class-validator";

export class PersonaUpdateDTO {
    
    readonly apellido: string;
    
    readonly nombre: string;
   
    readonly dni: string;
    
    readonly activo: boolean;
}