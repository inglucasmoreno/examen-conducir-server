"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const imagenes_controller_1 = require("./imagenes.controller");
const imagenes_service_1 = require("./imagenes.service");
const imagenes_schema_1 = require("./schema/imagenes.schema");
const preguntas_schema_1 = require("../preguntas/schema/preguntas.schema");
let ImagenesModule = class ImagenesModule {
};
ImagenesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Imagen', schema: imagenes_schema_1.imagenSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Pregunta', schema: preguntas_schema_1.preguntaSchema }]),
        ],
        controllers: [imagenes_controller_1.ImagenesController],
        providers: [imagenes_service_1.ImagenesService]
    })
], ImagenesModule);
exports.ImagenesModule = ImagenesModule;
//# sourceMappingURL=imagenes.module.js.map