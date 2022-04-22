import { IsNotEmpty } from "class-validator"

export class FormularioPracticaDTO {
    
    @IsNotEmpty()
    readonly nro_formulario: string;
    
    @IsNotEmpty()
    readonly nro_tramite: string;
    
    @IsNotEmpty()
    readonly persona: string;
    
    @IsNotEmpty()
    readonly tipo: string;
    
    readonly activo: boolean;

}