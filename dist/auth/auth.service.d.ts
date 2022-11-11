import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LugaresService } from 'src/lugares/lugares.service';
export declare class AuthService {
    private usuarioService;
    private lugaresService;
    private jwtService;
    private readonly logger;
    constructor(usuarioService: UsuariosService, lugaresService: LugaresService, jwtService: JwtService, logger: Logger);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        token: string;
    }>;
}
