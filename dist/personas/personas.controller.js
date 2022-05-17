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
exports.PersonasController = void 0;
const common_1 = require("@nestjs/common");
const personas_dto_1 = require("./dto/personas.dto");
const personas_service_1 = require("./personas.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const personas_update_dto_1 = require("./dto/personas-update.dto");
let PersonasController = class PersonasController {
    constructor(personasService) {
        this.personasService = personasService;
    }
    async getPersona(res, personaID) {
        const persona = await this.personasService.getPersona(personaID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Persona obtenida correctamente',
            persona
        });
    }
    async getPersonaDNI(res, personaDNI) {
        const persona = await this.personasService.getPersonaDNI(personaDNI);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Persona obtenida correctamente',
            persona
        });
    }
    async listarPersonas(res, querys) {
        const personas = await this.personasService.listarPersonas(querys);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de personas correcto',
            personas
        });
    }
    async crearPersona(res, personaDTO) {
        const persona = await this.personasService.crearPersona(personaDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Persona creada correctamente',
            persona
        });
    }
    async actualizarPersona(res, personaUpdateDTO, personaID) {
        const persona = await this.personasService.actualizarPersona(personaID, personaUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Persona actualizada correctamente',
            persona
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
], PersonasController.prototype, "getPersona", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/dni/:dni'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('dni')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "getPersonaDNI", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "listarPersonas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, personas_dto_1.PersonaDTO]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "crearPersona", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, personas_update_dto_1.PersonaUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], PersonasController.prototype, "actualizarPersona", null);
PersonasController = __decorate([
    (0, common_1.Controller)('personas'),
    __metadata("design:paramtypes", [personas_service_1.PersonasService])
], PersonasController);
exports.PersonasController = PersonasController;
//# sourceMappingURL=personas.controller.js.map