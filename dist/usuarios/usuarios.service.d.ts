import { Model } from 'mongoose';
import { UsuarioDTO } from './dto/usuarios.dto';
import { IUsuario } from './interface/usuarios.interface';
import { UsuarioUpdateDTO } from './dto/usuario-update.dto';
export declare type User = any;
export declare class UsuariosService {
    private readonly usuariosModel;
    constructor(usuariosModel: Model<IUsuario>);
    getUsuario(id: string): Promise<IUsuario>;
    getUsuarioPorNombre(nombreUsuario: string): Promise<IUsuario>;
    getUsuarioPorDni(dniUsuario: string): Promise<IUsuario>;
    getUsuarioPorCorreo(correoUsuario: string): Promise<IUsuario>;
    listarUsuarios(querys: any): Promise<IUsuario[]>;
    crearUsuario(usuarioDTO: UsuarioDTO): Promise<IUsuario>;
    actualizarUsuario(id: string, usuarioUpdateDTO: UsuarioUpdateDTO): Promise<IUsuario>;
}
