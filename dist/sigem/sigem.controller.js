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
exports.SigemController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const sigem_service_1 = require("./sigem.service");
let SigemController = class SigemController {
    constructor(sigemService) {
        this.sigemService = sigemService;
    }
    async insert(res) {
        const respuesta = await this.sigemService.autenticacion();
        res.status(common_1.HttpStatus.OK).json({
            respuesta
        });
    }
    async getPersona(res, data) {
        console.log(data);
        const { persona, success } = await this.sigemService.getPersona(data);
        res.status(common_1.HttpStatus.OK).json({
            persona,
            success
        });
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/token'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SigemController.prototype, "insert", null);
__decorate([
    (0, common_1.Post)('/getPersona'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SigemController.prototype, "getPersona", null);
SigemController = __decorate([
    (0, common_1.Controller)('sigem'),
    __metadata("design:paramtypes", [sigem_service_1.SigemService])
], SigemController);
exports.SigemController = SigemController;
//# sourceMappingURL=sigem.controller.js.map