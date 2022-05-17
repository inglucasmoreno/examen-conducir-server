import { Model } from 'mongoose';
import { IPregunta } from 'src/preguntas/interface/preguntas.interface';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';
import { ILugar } from 'src/lugares/interface/lugares.interface';
export declare class InicializacionService {
    private readonly preguntasModel;
    private readonly usuarioModel;
    private readonly lugarModel;
    constructor(preguntasModel: Model<IPregunta>, usuarioModel: Model<IUsuario>, lugarModel: Model<ILugar>);
    initPreguntas(): Promise<any>;
    initUsuarios(): Promise<any>;
}
