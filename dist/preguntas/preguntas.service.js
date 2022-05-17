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
exports.PreguntasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PreguntasService = class PreguntasService {
    constructor(preguntasModel) {
        this.preguntasModel = preguntasModel;
    }
    async getPregunta(id) {
        const pregunta = await this.preguntasModel.findById(id);
        if (!pregunta)
            throw new common_1.NotFoundException('La pregunta no existe');
        return pregunta;
    }
    async listarPreguntas(querys) {
        const { columna, direccion } = querys;
        let ordenar = [columna || 'apellido', direccion || 1];
        const preguntas = await this.preguntasModel.find().sort([ordenar]);
        return preguntas;
    }
    async crearPregunta(preguntaDTO) {
        const preguntas = await this.preguntasModel.find().sort({ 'numero': -1 });
        if (preguntas.length !== 0) {
            preguntaDTO.numero = preguntas[0].numero + 1;
        }
        else {
            preguntaDTO.numero = 1;
        }
        const pregunta = new this.preguntasModel(preguntaDTO);
        return await pregunta.save();
    }
    async actualizarPregunta(id, preguntaUpdateDTO) {
        const preguntaExiste = await this.getPregunta(id);
        if (!preguntaExiste)
            throw new common_1.NotFoundException('La pregunta no existe');
        const pregunta = await this.preguntasModel.findByIdAndUpdate(id, preguntaUpdateDTO, { new: true });
        return pregunta;
    }
};
PreguntasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Pregunta')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PreguntasService);
exports.PreguntasService = PreguntasService;
//# sourceMappingURL=preguntas.service.js.map