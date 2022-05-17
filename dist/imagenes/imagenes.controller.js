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
exports.ImagenesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const imagenes_service_1 = require("./imagenes.service");
let ImagenesController = class ImagenesController {
    constructor(imagenesService) {
        this.imagenesService = imagenesService;
    }
    async getImagene(res, imageID) {
        const imagen = await this.imagenesService.getImagen(imageID);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Imagen obtenida correctamente',
            imagen
        });
    }
    async listarImagenes(res) {
        const imagenes = await this.imagenesService.listarImagenes();
        res.status(common_1.HttpStatus.OK).json({
            message: 'Listado de imagenes correcto',
            imagenes
        });
    }
    async subirImagen(file, info) {
        const data = {
            descripcion: info.descripcion,
            url: file.filename,
            activo: true
        };
        const imagen = await this.imagenesService.nuevaImagen(data);
        return {
            msg: `Archivo ${file.filename} cargado correctamente`
        };
    }
    async actualizarImagen(res, imagenUpdateDTO, imagenID) {
        const imagen = await this.imagenesService.actualizarImagen(imagenID, imagenUpdateDTO);
        res.status(common_1.HttpStatus.OK).json({
            message: 'Imagen actualizada correctamente',
            imagen
        });
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImagenesController.prototype, "getImagene", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImagenesController.prototype, "listarImagenes", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: '../public/img',
            filename: function (req, file, cb) {
                const formato = file.mimetype.split('/')[1];
                cb(null, (0, uuid_1.v4)() + '.' + formato);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImagenesController.prototype, "subirImagen", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ImagenesController.prototype, "actualizarImagen", null);
ImagenesController = __decorate([
    (0, common_1.Controller)('imagenes'),
    __metadata("design:paramtypes", [imagenes_service_1.ImagenesService])
], ImagenesController);
exports.ImagenesController = ImagenesController;
//# sourceMappingURL=imagenes.controller.js.map