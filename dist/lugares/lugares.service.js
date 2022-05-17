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
exports.LugaresService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const usuarios_interface_1 = require("../usuarios/interface/usuarios.interface");
let LugaresService = class LugaresService {
    constructor(lugaresModel, usuariosModel) {
        this.lugaresModel = lugaresModel;
        this.usuariosModel = usuariosModel;
    }
    async getLugar(id) {
        const lugar = await this.lugaresModel.findById(id);
        if (!lugar)
            throw new common_1.NotFoundException('El lugar no existe');
        return lugar;
    }
    async listarLugares(querys) {
        const { columna, direccion } = querys;
        let ordenar = [columna || 'apellido', direccion || 1];
        const lugares = await this.lugaresModel.find()
            .sort([ordenar]);
        return lugares;
    }
    async crearLugar(lugarDTO) {
        const { descripcion } = lugarDTO;
        const lugarDB = await this.lugaresModel.findOne({ descripcion: descripcion.toLocaleUpperCase() });
        if (lugarDB)
            throw new common_1.NotFoundException('Ya existe un lugar con esa descripción');
        const lugar = new this.lugaresModel(lugarDTO);
        return await lugar.save();
    }
    async actualizarLugar(id, lugarUpdateDTO) {
        const { activo, descripcion } = lugarUpdateDTO;
        const lugarExiste = await this.getLugar(id);
        if (!lugarExiste)
            throw new common_1.NotFoundException('El lugar no existe');
        if (activo !== undefined && !activo) {
            const usuario = await this.usuariosModel.findOne({ lugar: id });
            if (usuario)
                throw new common_1.NotFoundException('Hay usuarios asignados a este lugar');
        }
        if (lugarExiste.descripcion !== descripcion) {
            const lugarDB = await this.lugaresModel.findOne({ descripcion });
            if (lugarDB)
                throw new common_1.NotFoundException('Ya existe un lugar con esa descripción');
        }
        const lugar = await this.lugaresModel.findByIdAndUpdate(id, lugarUpdateDTO, { new: true });
        return lugar;
    }
};
LugaresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Lugar')),
    __param(1, (0, mongoose_1.InjectModel)('Usuario')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LugaresService);
exports.LugaresService = LugaresService;
//# sourceMappingURL=lugares.service.js.map