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
exports.PersonasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PersonasService = class PersonasService {
    constructor(personaModel) {
        this.personaModel = personaModel;
    }
    async getPersona(id) {
        const persona = await this.personaModel.findById(id);
        if (!persona)
            throw new common_1.NotFoundException('La persona no existe');
        return persona;
    }
    async getPersonaDNI(dni) {
        const persona = await this.personaModel.findOne({ dni });
        return persona;
    }
    async listarPersonas(querys) {
        const { columna, direccion } = querys;
        let ordenar = [columna || 'apellido', direccion || 1];
        const personas = await this.personaModel.find()
            .sort([ordenar]);
        return personas;
    }
    async crearPersona(personaDTO) {
        const { dni } = personaDTO;
        let personaDB = await this.getPersonaDNI(dni);
        if (personaDB)
            throw new common_1.NotFoundException('El DNI ya esta registrado');
        const persona = new this.personaModel(personaDTO);
        return await persona.save();
    }
    async actualizarPersona(id, personaUpdateDTO) {
        const { dni } = personaUpdateDTO;
        let personaDB = await this.getPersona(id);
        if (!personaDB)
            throw new common_1.NotFoundException('La persona no existe');
        if (dni && dni !== personaDB.dni) {
            personaDB = await this.getPersonaDNI(dni);
            if (personaDB)
                throw new common_1.NotFoundException('El DNI ya esta registrado');
        }
        const persona = await this.personaModel.findByIdAndUpdate(id, personaUpdateDTO, { new: true });
        return persona;
    }
};
PersonasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Persona')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PersonasService);
exports.PersonasService = PersonasService;
//# sourceMappingURL=personas.service.js.map