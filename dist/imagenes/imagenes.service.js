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
exports.ImagenesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const preguntas_interface_1 = require("../preguntas/interface/preguntas.interface");
let ImagenesService = class ImagenesService {
    constructor(imagenModel, preguntaModel) {
        this.imagenModel = imagenModel;
        this.preguntaModel = preguntaModel;
    }
    async getImagen(id) {
        const imagen = await this.imagenModel.findById(id);
        return imagen;
    }
    async listarImagenes() {
        const imagenes = await this.imagenModel.find().sort({ descripcion: 1 });
        return imagenes;
    }
    async nuevaImagen(imagenDTO) {
        const { descripcion } = imagenDTO;
        const imagenDB = await this.imagenModel.findOne({ descripcion: descripcion.toLocaleUpperCase() });
        if (imagenDB)
            throw new common_1.NotFoundException('Ya existe una imagen con esa descripción');
        const imagen = new this.imagenModel(imagenDTO);
        return await imagen.save();
    }
    async actualizarImagen(id, imagenUpdateDTO) {
        const { activo, descripcion } = imagenUpdateDTO;
        const imagenDB = await this.imagenModel.findById(id);
        if (!imagenDB)
            throw new common_1.NotFoundException('La imagen a actualizar no existe');
        if (activo !== undefined && activo === false) {
            const pregunta = await this.preguntaModel.findOne({ imagen: id });
            if (pregunta)
                throw new common_1.NotFoundException('La imagen esta asociada a una pregunta');
        }
        if (descripcion !== undefined && imagenDB.descripcion !== descripcion) {
            const imagenExiste = await this.imagenModel.findOne({ descripcion: descripcion.toLocaleUpperCase() });
            if (imagenExiste)
                throw new common_1.NotFoundException('Ya existe una imagen con esa descripción');
        }
        const imagen = await this.imagenModel.findByIdAndUpdate(id, imagenUpdateDTO, { new: true });
        return imagen;
    }
};
ImagenesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Imagen')),
    __param(1, (0, mongoose_1.InjectModel)('Pregunta')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ImagenesService);
exports.ImagenesService = ImagenesService;
//# sourceMappingURL=imagenes.service.js.map