import { ExamenDTO } from './dto/examenes.dto';
import { ExamenesService } from './examenes.service';
export declare class ExamenesController {
    private examenesService;
    constructor(examenesService: ExamenesService);
    getExamen(res: any, examenID: any, activo: any): Promise<void>;
    getExamenDNI(res: any, dni: any): Promise<void>;
    getExamenPersona(res: any, persona: any): Promise<void>;
    imprimirExamen(res: any, data: any): Promise<void>;
    listarExamenesHistorial(res: any, querys: any, data: any): Promise<void>;
    listarExamenes(res: any, querys: any): Promise<void>;
    limpiarExamenes(res: any): Promise<void>;
    crearExamen(res: any, examenDTO: ExamenDTO): Promise<void>;
    actualizarExamen(res: any, examenUpdateDTO: any, examenID: any): Promise<void>;
    listarReactivaciones(res: any, querys: any, examenID: any): Promise<void>;
    reactivarExamen(res: any, examenUpdateDTO: any, examenID: any): Promise<void>;
    eliminarExamen(res: any, examenID: any): Promise<void>;
}
