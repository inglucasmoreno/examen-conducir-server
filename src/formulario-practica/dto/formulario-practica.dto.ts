import { IsNotEmpty } from "class-validator"

export class FormularioPracticaDTO {
    
    readonly nro_formulario: number;

    readonly nro_formulario_string: string;
    
    readonly nro_tramite: string;

    readonly lugar: string;
    
    @IsNotEmpty()
    readonly persona: string;
    
    @IsNotEmpty()
    readonly tipo: string;
    
    readonly activo: boolean;

}