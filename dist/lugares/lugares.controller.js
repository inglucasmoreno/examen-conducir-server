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
exports.LugaresController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const lugares_update_dto_1 = require("./dto/lugares-update.dto");
const lugares_dto_1 = require("./dto/lugares.dto");
const lugares_service_1 = require("./lugares.service");
let LugaresController = class LugaresController {
    constructor(lugaresService) {
        this.lugaresService = lugaresService;
    }
    async getLugar(res, lugarID) {
        const lugar = await this.lugaresService.getLugar(lugarID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Lugar obtenido correctamente',
            lugar
        });
    }
    async listarLugares(res, querys) {
        const lugares = await this.lugaresService.listarLugares(querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Los lugares se listaron correctamente',
            lugares
        });
    }
    async crearLugares(res, lugarDTO) {
        const lugar = await this.lugaresService.crearLugar(lugarDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Lugar creado correctamente',
            lugar
        });
    }
    async actualizarLugar(res, lugarUpdateDTO, lugarID) {
        const lugar = await this.lugaresService.actualizarLugar(lugarID, lugarUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            messsage: 'Lugar actualizado correctamente',
            lugar
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
], LugaresController.prototype, "getLugar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LugaresController.prototype, "listarLugares", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lugares_dto_1.LugarDTO]),
    __metadata("design:returntype", Promise)
], LugaresController.prototype, "crearLugares", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, lugares_update_dto_1.LugarUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], LugaresController.prototype, "actualizarLugar", null);
LugaresController = __decorate([
    (0, common_1.Controller)('lugares'),
    __metadata("design:paramtypes", [lugares_service_1.LugaresService])
], LugaresController);
exports.LugaresController = LugaresController;
//# sourceMappingURL=lugares.controller.js.map