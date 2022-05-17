"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioPracticaModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const formulario_practica_controller_1 = require("./formulario-practica.controller");
const formulario_practica_service_1 = require("./formulario-practica.service");
const formulario_practica_schema_1 = require("./schema/formulario-practica.schema");
let FormularioPracticaModule = class FormularioPracticaModule {
};
FormularioPracticaModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Formulario-practica', schema: formulario_practica_schema_1.formularioPracticaSchema }]),],
        controllers: [formulario_practica_controller_1.FormularioPracticaController],
        providers: [formulario_practica_service_1.FormularioPracticaService]
    })
], FormularioPracticaModule);
exports.FormularioPracticaModule = FormularioPracticaModule;
//# sourceMappingURL=formulario-practica.module.js.map