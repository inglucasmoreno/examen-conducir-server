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
exports.InicializacionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcryptjs = require("bcryptjs");
const XLSX = require("xlsx");
const preguntas_interface_1 = require("../preguntas/interface/preguntas.interface");
const usuarios_interface_1 = require("../usuarios/interface/usuarios.interface");
const lugares_interface_1 = require("../lugares/interface/lugares.interface");
let InicializacionService = class InicializacionService {
    constructor(preguntasModel, usuarioModel, lugarModel) {
        this.preguntasModel = preguntasModel;
        this.usuarioModel = usuarioModel;
        this.lugarModel = lugarModel;
    }
    async initPreguntas() {
        const verificacion = await this.preguntasModel.find();
        if (verificacion.length != 0)
            throw new common_1.NotFoundException('Las preguntas ya fueron inicializadas');
        const workbook = XLSX.readFile('./src/inicializacion/examen.xlsx');
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        const preguntas = dataExcel;
        preguntas.map(async (pregunta) => {
            const nuevaPregunta = new this.preguntasModel(pregunta);
            await nuevaPregunta.save();
        });
    }
    async initUsuarios() {
        const verificacion = await this.lugarModel.find();
        if (verificacion.length != 0)
            throw new common_1.NotFoundException('Los usuarios ya fueron inicializados');
        const nuevoLugar = new this.lugarModel({
            _id: '000000000000000000000000',
            descripcion: 'DIRECCION DE TRANSPORTE'
        });
        const lugar = await nuevoLugar.save();
        const data = {
            usuario: 'admin',
            apellido: 'Admin',
            nombre: 'Admin',
            dni: '34060399',
            lugar: lugar._id,
            permisos: [],
            email: 'admin@gmail.com',
            role: 'ADMIN_ROLE',
            activo: true
        };
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync('admin', salt);
        const usuario = new this.usuarioModel(data);
        await usuario.save();
    }
    async importarPreguntas(query) {
        const { usuario } = query;
        const preguntas = await this.preguntasModel.find();
        if (preguntas.length !== 0)
            throw new common_1.NotFoundException('Las preguntas ya se encuentran inicializadas');
        const workbook = XLSX.readFile('./importar/preguntas.xlsx');
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        const condicion = dataExcel.length > 0 &&
            dataExcel[0].numero &&
            dataExcel[0].descripcion &&
            dataExcel[0].respuesta_correcta &&
            dataExcel[0].respuesta_incorrecta_1 &&
            dataExcel[0].respuesta_incorrecta_2 &&
            dataExcel[0].frecuencia &&
            dataExcel[0].alcance &&
            dataExcel[0].eliminatoria;
        if (!condicion)
            throw new common_1.NotFoundException('Excel con formato incorrecto');
        let registrosCargados = 0;
        for (const preguntaRec of dataExcel) {
            let pregunta = preguntaRec;
            if (pregunta.numero &&
                pregunta.descripcion &&
                pregunta.respuesta_correcta &&
                pregunta.respuesta_incorrecta_1 &&
                pregunta.respuesta_incorrecta_2 &&
                pregunta.frecuencia &&
                pregunta.alcance &&
                pregunta.eliminatoria) {
                const data = {
                    numero: pregunta.numero,
                    descripcion: pregunta.descripcion,
                    respuesta_correcta: pregunta.respuesta_correcta,
                    respuesta_incorrecta_1: pregunta.respuesta_incorrecta_1,
                    respuesta_incorrecta_2: pregunta.respuesta_incorrecta_2,
                    frecuencia: pregunta.frecuencia,
                    alcance: pregunta.alcance,
                    eliminatoria: pregunta.eliminatoria === 'SI' ? true : false,
                    creatorUser: usuario,
                    updatorUser: usuario
                };
                registrosCargados += 1;
                const nuevaPregunta = new this.preguntasModel(data);
                await nuevaPregunta.save();
            }
        }
        if (registrosCargados === 0) {
            return 'La base de preguntas ya se encuentra actualizada';
        }
        else {
            return `Cantidad de registros cargados: ${registrosCargados}`;
        }
    }
};
InicializacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Pregunta')),
    __param(1, (0, mongoose_1.InjectModel)('Usuario')),
    __param(2, (0, mongoose_1.InjectModel)('Lugar')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], InicializacionService);
exports.InicializacionService = InicializacionService;
//# sourceMappingURL=inicializacion.service.js.map