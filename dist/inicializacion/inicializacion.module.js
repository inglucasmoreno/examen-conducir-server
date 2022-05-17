"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InicializacionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const inicializacion_controller_1 = require("./inicializacion.controller");
const inicializacion_service_1 = require("./inicializacion.service");
const preguntas_schema_1 = require("../preguntas/schema/preguntas.schema");
const usuarios_schema_1 = require("../usuarios/schema/usuarios.schema");
const lugares_schema_1 = require("../lugares/schema/lugares.schema");
let InicializacionModule = class InicializacionModule {
};
InicializacionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Pregunta', schema: preguntas_schema_1.preguntaSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Usuario', schema: usuarios_schema_1.usuarioSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Lugar', schema: lugares_schema_1.lugarSchema }])
        ],
        controllers: [inicializacion_controller_1.InicializacionController],
        providers: [inicializacion_service_1.InicializacionService]
    })
], InicializacionModule);
exports.InicializacionModule = InicializacionModule;
//# sourceMappingURL=inicializacion.module.js.map