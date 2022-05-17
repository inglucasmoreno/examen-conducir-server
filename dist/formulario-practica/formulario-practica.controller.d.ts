import { FormularioPracticaUpdateDTO } from './dto/formulario-practica-update.dto';
import { FormularioPracticaDTO } from './dto/formulario-practica.dto';
import { FormularioPracticaService } from './formulario-practica.service';
export declare class FormularioPracticaController {
    private formularioPracticaService;
    constructor(formularioPracticaService: FormularioPracticaService);
    getFormulario(res: any, formularioID: any): Promise<void>;
    listarFormularios(res: any, querys: any): Promise<void>;
    listarFormulariosPorLugar(res: any, querys: any, lugarID: any): Promise<void>;
    limpiarFormularios(res: any): Promise<void>;
    crearFormulario(res: any, formularioPracticaDTO: FormularioPracticaDTO, querys: any): Promise<void>;
    imprimirFormulario(res: any, data: any): Promise<void>;
    actualizarFomulario(res: any, formularioPracticaUpdateDTO: FormularioPracticaUpdateDTO, formularioID: any): Promise<void>;
}
