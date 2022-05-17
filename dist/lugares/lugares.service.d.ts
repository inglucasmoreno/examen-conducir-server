import { Model } from 'mongoose';
import { LugarUpdateDTO } from './dto/lugares-update.dto';
import { LugarDTO } from './dto/lugares.dto';
import { ILugar } from './interface/lugares.interface';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';
export declare class LugaresService {
    private readonly lugaresModel;
    private readonly usuariosModel;
    constructor(lugaresModel: Model<ILugar>, usuariosModel: Model<IUsuario>);
    getLugar(id: string): Promise<ILugar>;
    listarLugares(querys: any): Promise<ILugar[]>;
    crearLugar(lugarDTO: LugarDTO): Promise<ILugar>;
    actualizarLugar(id: string, lugarUpdateDTO: LugarUpdateDTO): Promise<ILugar>;
}
