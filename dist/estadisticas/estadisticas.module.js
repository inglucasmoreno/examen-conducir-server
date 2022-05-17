"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadisticasModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const estadisticas_controller_1 = require("./estadisticas.controller");
const estadisticas_service_1 = require("./estadisticas.service");
const est_preguntas_schema_1 = require("./schema/est-preguntas.schema");
let EstadisticasModule = class EstadisticasModule {
};
EstadisticasModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Est-preguntas', schema: est_preguntas_schema_1.estPreguntaSchema }])],
        controllers: [estadisticas_controller_1.EstadisticasController],
        providers: [estadisticas_service_1.EstadisticasService]
    })
], EstadisticasModule);
exports.EstadisticasModule = EstadisticasModule;
//# sourceMappingURL=estadisticas.module.js.map