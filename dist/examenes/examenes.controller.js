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
exports.ExamenesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const examenes_dto_1 = require("./dto/examenes.dto");
const examenes_service_1 = require("./examenes.service");
const date_fns_1 = require("date-fns");
let ExamenesController = class ExamenesController {
    constructor(examenesService) {
        this.examenesService = examenesService;
    }
    async getExamen(res, examenID, activo) {
        const examen = await this.examenesService.getExamen(examenID, activo);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen obtenido correctamente',
            examen
        });
    }
    async getExamenDNI(res, dni) {
        const examen = await this.examenesService.getExamenDni(dni);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen obtenido correctamente',
            examen
        });
    }
    async getExamenPersona(res, persona) {
        const examen = await this.examenesService.getExamenPersona(persona);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen obtenido correctamente',
            examen
        });
    }
    async imprimirExamen(res, data) {
        await this.examenesService.imprimirExamen(data);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen generado correctamente',
        });
    }
    async listarExamenesHistorial(res, querys, data) {
        const examenes = await this.examenesService.listarExamenesHistorial(querys, data);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de examenes para historial correcto',
            examenes
        });
    }
    async listarExamenes(res, querys) {
        const examenes = await this.examenesService.listarExamenes(querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de examenes correcto',
            examenes
        });
    }
    async limpiarExamenes(res) {
        const examenes = await this.examenesService.limpiarExamenes();
        res.status(common_1.HttpStatus.OK).json({
            message: 'Limpieza de examenes correcta',
            examenes
        });
    }
    async crearExamen(res, examenDTO) {
        const examenDB = await this.examenesService.getExamenPersona(examenDTO.persona);
        if (examenDB)
            throw new common_1.NotFoundException('Ya existe un examen creado para esta persona');
        const examen = await this.examenesService.crearExamen(examenDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen creado correctamente',
            examen
        });
    }
    async actualizarExamen(res, examenUpdateDTO, examenID) {
        const { estado, tiempo, activo } = examenUpdateDTO;
        if (estado === 'Rindiendo') {
            const fechaActual = new Date();
            const fechaFinalizacion = (0, date_fns_1.add)(fechaActual, { minutes: Number(tiempo) });
            examenUpdateDTO.fecha_rindiendo = fechaActual;
            examenUpdateDTO.fecha_finalizacion = fechaFinalizacion;
        }
        let examen;
        if (activo === false) {
            const data = await this.examenesService.finalizarExamen(examenID, examenUpdateDTO);
            examen = await this.examenesService.actualizarExamen(examenID, data);
        }
        else {
            examen = await this.examenesService.actualizarExamen(examenID, examenUpdateDTO);
        }
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen actualizado correctamente',
            examen
        });
    }
    async listarReactivaciones(res, querys, examenID) {
        const reactivaciones = await this.examenesService.listarReactivaciones(examenID, querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de reactivaciones correcta',
            reactivaciones
        });
    }
    async reactivarExamen(res, examenUpdateDTO, examenID) {
        const examen = await this.examenesService.reactivarExamen(examenID, examenUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen reactivado correctamente',
            examen
        });
    }
    async eliminarExamen(res, examenID) {
        const examen = await this.examenesService.eliminarExamen(examenID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Examen eliminado correctamente'
        });
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('activo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "getExamen", null);
__decorate([
    (0, common_1.Get)('/dni/:dni'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('dni')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "getExamenDNI", null);
__decorate([
    (0, common_1.Get)('/persona/:persona'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('persona')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "getExamenPersona", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/imprimir'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "imprimirExamen", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/historial/listado'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "listarExamenesHistorial", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "listarExamenes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/limpiar/antiguos'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "limpiarExamenes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, examenes_dto_1.ExamenDTO]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "crearExamen", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "actualizarExamen", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/reactivar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "listarReactivaciones", null);
__decorate([
    (0, common_1.Put)('/reactivar/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "reactivarExamen", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ExamenesController.prototype, "eliminarExamen", null);
ExamenesController = __decorate([
    (0, common_1.Controller)('examenes'),
    __metadata("design:paramtypes", [examenes_service_1.ExamenesService])
], ExamenesController);
exports.ExamenesController = ExamenesController;
//# sourceMappingURL=examenes.controller.js.map