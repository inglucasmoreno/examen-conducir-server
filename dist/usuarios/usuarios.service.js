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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsuariosService = class UsuariosService {
    constructor(usuariosModel) {
        this.usuariosModel = usuariosModel;
    }
    async getUsuario(id) {
        const usuario = await this.usuariosModel.findById(id);
        if (!usuario)
            throw new common_1.NotFoundException('El usuario no existe');
        return usuario;
    }
    async getUsuarioPorNombre(nombreUsuario) {
        const usuario = await this.usuariosModel.findOne({ usuario: nombreUsuario });
        return usuario;
    }
    async getUsuarioPorDni(dniUsuario) {
        const usuario = await this.usuariosModel.findOne({ dni: dniUsuario });
        return usuario;
    }
    async getUsuarioPorCorreo(correoUsuario) {
        const usuario = await this.usuariosModel.findOne({ dni: correoUsuario });
        return usuario;
    }
    async listarUsuarios(querys) {
        const { columna, direccion } = querys;
        let pipeline = [];
        pipeline.push({ $match: {} });
        pipeline.push({ $lookup: {
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            } });
        pipeline.push({ $unwind: '$lugar' });
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        const usuarios = await this.usuariosModel.aggregate(pipeline);
        return usuarios;
    }
    async crearUsuario(usuarioDTO) {
        const { usuario, dni, email, password } = usuarioDTO;
        let usuarioDB = await this.getUsuarioPorNombre(usuario);
        if (usuarioDB)
            throw new common_1.NotFoundException('El nombre de usuario ya esta registrado');
        usuarioDB = await this.getUsuarioPorDni(dni);
        if (usuarioDB)
            throw new common_1.NotFoundException('El dni ya se encuentra registrado');
        usuarioDB = await this.getUsuarioPorCorreo(email);
        if (usuarioDB)
            throw new common_1.NotFoundException('El correo ya se encuentra registrado');
        const nuevoUsuario = new this.usuariosModel(usuarioDTO);
        return await nuevoUsuario.save();
    }
    async actualizarUsuario(id, usuarioUpdateDTO) {
        const { dni, usuario } = usuarioUpdateDTO;
        let usuarioDB = await this.getUsuario(id);
        if (!usuarioDB)
            throw new common_1.NotFoundException('El usuario no existe');
        if (usuario && usuarioDB.usuario !== usuario) {
            const usuarioDBNombre = await this.getUsuarioPorNombre(usuario);
            if (usuarioDBNombre)
                throw new common_1.NotFoundException('El nombre de usuario ya esta registrado');
        }
        if (dni && usuarioDB.dni !== dni) {
            const usuarioDBPassword = await this.getUsuarioPorDni(dni);
            if (usuarioDBPassword)
                throw new common_1.NotFoundException('El dni ya se encuentra registrado');
        }
        const usuarioRes = await this.usuariosModel.findByIdAndUpdate(id, usuarioUpdateDTO, { new: true });
        return usuarioRes;
    }
};
UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Usuario')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
exports.UsuariosService = UsuariosService;
//# sourceMappingURL=usuarios.service.js.map