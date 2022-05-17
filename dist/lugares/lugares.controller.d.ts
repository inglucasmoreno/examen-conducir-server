import { LugarUpdateDTO } from './dto/lugares-update.dto';
import { LugarDTO } from './dto/lugares.dto';
import { LugaresService } from './lugares.service';
export declare class LugaresController {
    private lugaresService;
    constructor(lugaresService: LugaresService);
    getLugar(res: any, lugarID: any): Promise<void>;
    listarLugares(res: any, querys: any): Promise<void>;
    crearLugares(res: any, lugarDTO: LugarDTO): Promise<void>;
    actualizarLugar(res: any, lugarUpdateDTO: LugarUpdateDTO, lugarID: any): Promise<void>;
}
