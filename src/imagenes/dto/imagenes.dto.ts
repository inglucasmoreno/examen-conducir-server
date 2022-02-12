import { IsNotEmpty } from "class-validator"

export class ImagenDTO {
    
    @IsNotEmpty()
    readonly descripcion: string;
    
    @IsNotEmpty()
    readonly url: string;
    
    readonly activo: boolean;

}