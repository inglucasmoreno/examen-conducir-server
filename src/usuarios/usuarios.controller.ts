import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { UsuarioDTO } from './dto/usuarios.dto';
import { UsuariosService } from './usuarios.service';
import * as bcryptjs from 'bcryptjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsuarioUpdateDTO } from './dto/usuario-update.dto';
import { LugaresService } from '../lugares/lugares.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService,
                private lugaresService: LugaresService){}

    // Usuario por ID
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getUsuario(@Res() res, @Param('id') usuarioID) {
        const usuario = await this.usuariosService.getUsuario(usuarioID);
        res.status(HttpStatus.OK).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    }

    // Listar usuarios
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarUsuarios(@Res() res, @Query() querys) {
        const usuarios = await this.usuariosService.listarUsuarios(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de usuarios correcto',
            usuarios
        });
    }

    // Crear usuario
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async crearUsuario(@Res() res, @Body() usuarioDTO: UsuarioDTO ) {

        const { password, role } = usuarioDTO;

        // Se encripta el password
        const salt = bcryptjs.genSaltSync();
        usuarioDTO.password = bcryptjs.hashSync(password, salt);

        // Se verifica si es administrador o usuario estandar
        if(role === 'ADMIN_ROLE'){
            const query = { columna: 'createdAt', direccion: 1 };
            const lugares = await this.lugaresService.listarLugares({query});
            usuarioDTO.lugar = lugares[0]._id;                    
        }

        // Se crea el nuevo usuario
        const usuarioCreado = await this.usuariosService.crearUsuario(usuarioDTO);        
        res.status(HttpStatus.OK).json({
            message: 'Usuario creado correctamente',
            usuario: usuarioCreado
        });
    
        }

    // Actualizar usuario
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarUsuario(@Res() res, @Body() usuarioUpdateDTO: UsuarioUpdateDTO, @Param('id') usuarioID ) {

        const { password, role } = usuarioUpdateDTO;

        if(password){
            const salt = bcryptjs.genSaltSync();
            usuarioUpdateDTO.password = bcryptjs.hashSync(password, salt);
        }

        // Se verifica si es administrador o usuario estandar
        if(role === 'ADMIN_ROLE'){
            const query = { columna: 'createdAt', direccion: 1 };
            const lugares = await this.lugaresService.listarLugares({query});
            usuarioUpdateDTO.lugar = lugares[0]._id;                    
        }

        const usuario = await this.usuariosService.actualizarUsuario(usuarioID, usuarioUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Usuario actualizado correctamente',
            usuario
        });

    }

}
