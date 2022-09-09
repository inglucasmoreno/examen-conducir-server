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
exports.InicializacionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const inicializacion_service_1 = require("./inicializacion.service");
let InicializacionController = class InicializacionController {
    constructor(inicializacionService) {
        this.inicializacionService = inicializacionService;
    }
    async initPreguntas(res) {
        await this.inicializacionService.initPreguntas();
        res.status(common_1.HttpStatus.OK).json({
            message: 'Inicializacion de preguntas completada correctamente'
        });
    }
    async initUsuarios(res) {
        await this.inicializacionService.initUsuarios();
        res.status(common_1.HttpStatus.OK).json({
            message: 'Inicializacion de usuarios completado correctamente'
        });
    }
    async importarPreguntas(file, query) {
        const msg = await this.inicializacionService.importarPreguntas(query);
        return {
            msg
        };
    }
};
__decorate([
    (0, common_1.Get)('/preguntas'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InicializacionController.prototype, "initPreguntas", null);
__decorate([
    (0, common_1.Get)('/usuarios'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InicializacionController.prototype, "initUsuarios", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './importar',
            filename: function (req, file, cb) {
                cb(null, 'preguntas.xlsx');
            }
        })
    })),
    (0, common_1.Post)('/preguntas'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InicializacionController.prototype, "importarPreguntas", null);
InicializacionController = __decorate([
    (0, common_1.Controller)('inicializacion'),
    __metadata("design:paramtypes", [inicializacion_service_1.InicializacionService])
], InicializacionController);
exports.InicializacionController = InicializacionController;
//# sourceMappingURL=inicializacion.controller.js.map