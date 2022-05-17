"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const personas_module_1 = require("./personas/personas.module");
const lugares_module_1 = require("./lugares/lugares.module");
const preguntas_module_1 = require("./preguntas/preguntas.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const auth_module_1 = require("./auth/auth.module");
const mongo_module_1 = require("./config/mongo.module");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./auth/constants");
const examenes_module_1 = require("./examenes/examenes.module");
const inicializacion_module_1 = require("./inicializacion/inicializacion.module");
const imagenes_module_1 = require("./imagenes/imagenes.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const socket_module_1 = require("./socket/socket.module");
const config_1 = require("@nestjs/config");
const estadisticas_module_1 = require("./estadisticas/estadisticas.module");
const formulario_practica_module_1 = require("./formulario-practica/formulario-practica.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            personas_module_1.PersonasModule,
            lugares_module_1.LugaresModule,
            preguntas_module_1.PreguntasModule,
            usuarios_module_1.UsuariosModule,
            auth_module_1.AuthModule,
            mongo_module_1.MongoModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '12h' }
            }),
            examenes_module_1.ExamenesModule,
            inicializacion_module_1.InicializacionModule,
            imagenes_module_1.ImagenesModule,
            socket_module_1.SocketModule,
            estadisticas_module_1.EstadisticasModule,
            formulario_practica_module_1.FormularioPracticaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map