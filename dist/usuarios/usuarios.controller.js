"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_dto_1 = require("./dto/usuarios.dto");
const usuarios_service_1 = require("./usuarios.service");
const bcryptjs = require("bcryptjs");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const usuario_update_dto_1 = require("./dto/usuario-update.dto");
const lugares_service_1 = require("../lugares/lugares.service");
let UsuariosController = class UsuariosController {
    constructor(usuariosService, lugaresService) {
        this.usuariosService = usuariosService;
        this.lugaresService = lugaresService;
    }
    async getUsuario(res, usuarioID) {
        const usuario = await this.usuariosService.getUsuario(usuarioID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Usuario obtenido correctamente',
            usuario
        });
    }
    async listarUsuarios(res, querys) {
        const usuarios = await this.usuariosService.listarUsuarios(querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de usuarios correcto',
            usuarios
        });
    }
    async crearUsuario(res, usuarioDTO) {
        const { password, role } = usuarioDTO;
        const salt = bcryptjs.genSaltSync();
        usuarioDTO.password = bcryptjs.hashSync(password, salt);
        if (role === 'ADMIN_ROLE') {
            const query = { columna: 'createdAt', direccion: 1 };
            const lugares = await this.lugaresService.listarLugares({ query });
            usuarioDTO.lugar = lugares[0]._id;
        }
        const usuarioCreado = await this.usuariosService.crearUsuario(usuarioDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Usuario creado correctamente',
            usuario: usuarioCreado
        });
    }
    async actualizarUsuario(res, usuarioUpdateDTO, usuarioID) {
        const { password, role } = usuarioUpdateDTO;
        if (password) {
            const salt = bcryptjs.genSaltSync();
            usuarioUpdateDTO.password = bcryptjs.hashSync(password, salt);
        }
        if (role === 'ADMIN_ROLE') {
            const query = { columna: 'createdAt', direccion: 1 };
            const lugares = await this.lugaresService.listarLugares({ query });
            usuarioUpdateDTO.lugar = lugares[0]._id;
        }
        const usuario = await this.usuariosService.actualizarUsuario(usuarioID, usuarioUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Usuario actualizado correctamente',
            usuario
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "getUsuario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "listarUsuarios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usuarios_dto_1.UsuarioDTO]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "crearUsuario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, usuario_update_dto_1.UsuarioUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "actualizarUsuario", null);
UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        lugares_service_1.LugaresService])
], UsuariosController);
exports.UsuariosController = UsuariosController;
//# sourceMappingURL=usuarios.controller.js.map