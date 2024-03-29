import { Model } from 'mongoose';
import { ExamenDTO } from './dto/examenes.dto';
import { IExamen } from './interface/examenes.interface';
import { IPregunta } from 'src/preguntas/interface/preguntas.interface';
import { IEstPreguntas } from 'src/estadisticas/interface/est-preguntas.interface';
import { IRectivacion } from './interface/reactivaciones.interface';
export declare class ExamenesService {
    private readonly examenModel;
    private readonly estPreguntasModel;
    private readonly reactivacionModel;
    private readonly preguntaModel;
    url_logo: string;
    url_imagenes: string;
    url_template_examen: string;
    url_destino_pdf_examen: string;
    constructor(examenModel: Model<IExamen>, estPreguntasModel: Model<IEstPreguntas>, reactivacionModel: Model<IRectivacion>, preguntaModel: Model<IPregunta>);
    getExamen(id: string, activo: string): Promise<any>;
    getExamenDni(dni: string): Promise<any>;
    getExamenPersona(persona: string): Promise<any>;
    limpiarExamenes(): Promise<IExamen[]>;
    listarExamenesHistorial(querys: any, data: any): Promise<any>;
    listarExamenes(querys: any): Promise<IExamen[]>;
    crearExamen(examenDTO: ExamenDTO): Promise<string>;
    actualizarExamen(id: string, examenUpdateDTO: any): Promise<IExamen>;
    listarReactivaciones(examenID: any, querys: any): Promise<IExamen[]>;
    reactivarExamen(id: string, examenUpdateDTO: any): Promise<IExamen>;
    finalizarExamen(id: string, examenUpdateDTO: any): Promise<IExamen>;
    imprimirExamen(examen: any): Promise<void>;
    eliminarExamen(id: string): Promise<IExamen>;
    estadisticasExamenes(querys: any): Promise<any>;
}
