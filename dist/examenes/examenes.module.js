"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamenesModule = void 0;
const common_1 = require("@nestjs/common");
const examenes_controller_1 = require("./examenes.controller");
const examenes_service_1 = require("./examenes.service");
const mongoose_1 = require("@nestjs/mongoose");
const examenes_schema_1 = require("./schema/examenes.schema");
const preguntas_schema_1 = require("../preguntas/schema/preguntas.schema");
const est_preguntas_schema_1 = require("../estadisticas/schema/est-preguntas.schema");
const reactivaciones_schema_1 = require("./schema/reactivaciones.schema");
let ExamenesModule = class ExamenesModule {
};
ExamenesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Examen', schema: examenes_schema_1.examenSchema },
                { name: 'Pregunta', schema: preguntas_schema_1.preguntaSchema },
                { name: 'Est-preguntas', schema: est_preguntas_schema_1.estPreguntaSchema },
                { name: 'Reactivacion', schema: reactivaciones_schema_1.reactivacionSchema }
            ]),
        ],
        controllers: [examenes_controller_1.ExamenesController],
        providers: [examenes_service_1.ExamenesService]
    })
], ExamenesModule);
exports.ExamenesModule = ExamenesModule;
//# sourceMappingURL=examenes.module.js.map