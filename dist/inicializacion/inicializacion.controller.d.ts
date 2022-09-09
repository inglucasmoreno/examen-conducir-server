/// <reference types="multer" />
import { InicializacionService } from './inicializacion.service';
export declare class InicializacionController {
    private inicializacionService;
    constructor(inicializacionService: InicializacionService);
    initPreguntas(res: any): Promise<void>;
    initUsuarios(res: any): Promise<void>;
    importarPreguntas(file: Express.Multer.File, query: any): Promise<{
        msg: any;
    }>;
}
