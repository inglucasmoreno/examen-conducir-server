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
exports.FormularioPracticaController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const formulario_practica_update_dto_1 = require("./dto/formulario-practica-update.dto");
const formulario_practica_dto_1 = require("./dto/formulario-practica.dto");
const formulario_practica_service_1 = require("./formulario-practica.service");
let FormularioPracticaController = class FormularioPracticaController {
    constructor(formularioPracticaService) {
        this.formularioPracticaService = formularioPracticaService;
    }
    async getFormulario(res, formularioID) {
        const formulario = await this.formularioPracticaService.getFormulario(formularioID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Formulario obtenido correctamente',
            formulario
        });
    }
    async listarFormularios(res, querys) {
        const formularios = await this.formularioPracticaService.listarFormularios(querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Los formularios se listaron correctamente',
            formularios
        });
    }
    async listarFormulariosPorLugar(res, querys, lugarID) {
        const formularios = await this.formularioPracticaService.listarFormulariosPorLugar(lugarID, querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Los formularios se listaron correctamente',
            formularios
        });
    }
    async limpiarFormularios(res) {
        const formularios = await this.formularioPracticaService.limpiarFormularios();
        res.status(common_1.HttpStatus.OK).json({
            message: 'Los formularios se limpiaron correctamente',
            formularios
        });
    }
    async crearFormulario(res, formularioPracticaDTO, querys) {
        const formulario = await this.formularioPracticaService.crearFormulario(formularioPracticaDTO, querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Fomulario creado correctamente',
            formulario
        });
    }
    async imprimirFormulario(res, data) {
        await this.formularioPracticaService.imprimirFormulario(data);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Formulario generado correctamente',
        });
    }
    async actualizarFomulario(res, formularioPracticaUpdateDTO, formularioID) {
        const formulario = await this.formularioPracticaService.actualizarFormulario(formularioID, formularioPracticaUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            messsage: 'Formulario actualizado correctamente',
            formulario
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
], FormularioPracticaController.prototype, "getFormulario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormularioPracticaController.prototype, "listarFormularios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/lugar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FormularioPracticaController.prototype, "listarFormulariosPorLugar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/antiguos/limpiar/todos'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormularioPracticaController.prototype, "limpiarFormularios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, formulario_practica_dto_1.FormularioPracticaDTO, Object]),
    __metadata("design:returntype", Promise)
], FormularioPracticaController.prototype, "crearFormulario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/imprimir'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormularioPracticaController.prototype, "imprimirFormulario", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, formulario_practica_update_dto_1.FormularioPracticaUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], FormularioPracticaController.prototype, "actualizarFomulario", null);
FormularioPracticaController = __decorate([
    (0, common_1.Controller)('formulario-practica'),
    __metadata("design:paramtypes", [formulario_practica_service_1.FormularioPracticaService])
], FormularioPracticaController);
exports.FormularioPracticaController = FormularioPracticaController;
//# sourceMappingURL=formulario-practica.controller.js.map