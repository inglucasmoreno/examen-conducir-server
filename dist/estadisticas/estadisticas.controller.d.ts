import { EstadisticasService } from './estadisticas.service';
export declare class EstadisticasController {
    private estadisticasService;
    constructor(estadisticasService: EstadisticasService);
    getImagene(res: any, querys: any): Promise<void>;
}
