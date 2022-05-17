import { UsuarioDTO } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import { UsuarioUpdateDTO } from './dto/usuario-update.dto';
import { LugaresService } from '../lugares/lugares.service';
export declare class UsuariosController {
    private usuariosService;
    private lugaresService;
    constructor(usuariosService: UsuariosService, lugaresService: LugaresService);
    getUsuario(res: any, usuarioID: any): Promise<void>;
    listarUsuarios(res: any, querys: any): Promise<void>;
    crearUsuario(res: any, usuarioDTO: UsuarioDTO): Promise<void>;
    actualizarUsuario(res: any, usuarioUpdateDTO: UsuarioUpdateDTO, usuarioID: any): Promise<void>;
}
