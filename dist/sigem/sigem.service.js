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
exports.SigemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const personas_interface_1 = require("../personas/interface/personas.interface");
const axios_1 = require("axios");
let SigemService = class SigemService {
    constructor(personasModel) {
        this.personasModel = personasModel;
    }
    ;
    async autenticacion() {
        const respuesta = await axios_1.default.post('https://sigem.sanluislaciudad.gob.ar/sigem/comunicacionExterna/login', {}, {
            headers: {
                username: process.env.SIGEM_USUARIO || '',
                password: process.env.SIGEM_PASSWORD || ''
            }
        });
        return respuesta.data;
    }
    async getPersona(data) {
        const { dni, userCreator, userUpdator } = data;
        const dataAuthentication = await this.autenticacion();
        const respuesta = await axios_1.default.post('https://sigem.sanluislaciudad.gob.ar/sigem/comunicacionExterna/getInfoPersona', { dni: Number(dni) }, { headers: { accesstoken: dataAuthentication.accesstoken } });
        let persona = null;
        let success = false;
        if (respuesta.data.success) {
            const personaDB = await this.personasModel.findOne({ dni });
            success = true;
            if (personaDB) {
                const dataUpdate = {
                    apellido: respuesta.data.informacion.apellido,
                    nombre: respuesta.data.informacion.nombre,
                    dni: respuesta.data.informacion.dni,
                    sigem: true,
                    userUpdator: data.updatorUser,
                };
                persona = await this.personasModel.findOneAndUpdate({ dni }, dataUpdate, { new: true });
                console.log(persona);
            }
            else {
                const dataCreator = Object.assign(Object.assign({}, respuesta.data.informacion), { sigem: true, userCreator,
                    userUpdator });
                const nuevaPersona = new this.personasModel(dataCreator);
                persona = await nuevaPersona.save();
            }
        }
        else {
            persona = await this.personasModel.findOne({ dni });
            if (persona)
                success = true;
        }
        return {
            persona,
            success
        };
    }
};
SigemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Personas')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SigemService);
exports.SigemService = SigemService;
//# sourceMappingURL=sigem.service.js.map