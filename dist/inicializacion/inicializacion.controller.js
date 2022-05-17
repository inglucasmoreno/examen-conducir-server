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
InicializacionController = __decorate([
    (0, common_1.Controller)('inicializacion'),
    __metadata("design:paramtypes", [inicializacion_service_1.InicializacionService])
], InicializacionController);
exports.InicializacionController = InicializacionController;
//# sourceMappingURL=inicializacion.controller.js.map