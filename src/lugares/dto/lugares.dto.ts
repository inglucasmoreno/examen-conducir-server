import { IsNotEmpty } from "class-validator"

export class LugarDTO {
    
    @IsNotEmpty()
    readonly descripcion: string;
    
    readonly activo: boolean;

}