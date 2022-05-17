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
exports.PreguntasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const preguntas_update_dto_1 = require("./dto/preguntas-update.dto");
const preguntas_dto_1 = require("./dto/preguntas.dto");
const preguntas_service_1 = require("./preguntas.service");
let PreguntasController = class PreguntasController {
    constructor(preguntasService) {
        this.preguntasService = preguntasService;
    }
    async getPregunta(res, preguntaID) {
        const pregunta = await this.preguntasService.getPregunta(preguntaID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Pregunta obtenida correctamente',
            pregunta
        });
    }
    async listarPreguntas(res, querys) {
        const preguntas = await this.preguntasService.listarPreguntas(querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de preguntas correcto',
            preguntas
        });
    }
    async crearPregunta(res, preguntaDTO) {
        const pregunta = await this.preguntasService.crearPregunta(preguntaDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Pregunta creada correctamente',
            pregunta
        });
    }
    async actualizarPregunta(res, preguntaUpdateDTO, preguntaID) {
        const pregunta = await this.preguntasService.actualizarPregunta(preguntaID, preguntaUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Pregunta actualizada correctamente',
            pregunta
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
], PreguntasController.prototype, "getPregunta", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PreguntasController.prototype, "listarPreguntas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, preguntas_dto_1.PreguntaDTO]),
    __metadata("design:returntype", Promise)
], PreguntasController.prototype, "crearPregunta", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, preguntas_update_dto_1.PreguntaUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], PreguntasController.prototype, "actualizarPregunta", null);
PreguntasController = __decorate([
    (0, common_1.Controller)('preguntas'),
    __metadata("design:paramtypes", [preguntas_service_1.PreguntasService])
], PreguntasController);
exports.PreguntasController = PreguntasController;
//# sourceMappingURL=preguntas.controller.js.map