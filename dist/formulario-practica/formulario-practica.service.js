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
exports.FormularioPracticaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose = require("mongoose");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const date_fns_1 = require("date-fns");
let FormularioPracticaService = class FormularioPracticaService {
    constructor(formularioPracticaModel) {
        this.formularioPracticaModel = formularioPracticaModel;
        this.url_logo = 'http://localhost:' + (process.env.PORT || 3000) + '/pdf/logo.png';
        this.url_template_auto = process.env.URL_TEMPLATE_FORMULARIO_AUTO || './pdf/template/formulario_auto.html';
        this.url_template_moto = process.env.URL_TEMPLATE_FORMULARIO_MOTO || './pdf/template/formulario_moto.html';
        this.url_destino_pdf_auto = process.env.URL_DESTINO_PDF_AUTO || './public/pdf/formulario_auto.pdf';
        this.url_destino_pdf_moto = process.env.URL_DESTINO_PDF_MOTO || './public/pdf/formulario_moto.pdf';
    }
    async getFormulario(id) {
        const formularioPractica = await this.formularioPracticaModel.findById(id);
        if (!formularioPractica)
            throw new common_1.NotFoundException('El formulario no existe');
        return formularioPractica;
    }
    async listarFormularios(querys) {
        const { columna, direccion } = querys;
        const pipeline = [];
        pipeline.push({ $match: {} });
        pipeline.push({ $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            } });
        pipeline.push({ $unwind: '$persona' });
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        const formularios = await this.formularioPracticaModel.aggregate(pipeline);
        return formularios;
    }
    async listarFormulariosPorLugar(id, querys) {
        const { columna, direccion } = querys;
        const pipeline = [];
        const idLugar = new mongoose.Types.ObjectId(id);
        pipeline.push({ $match: { lugar: idLugar } });
        pipeline.push({ $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            } });
        pipeline.push({ $unwind: '$persona' });
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        const formularios = await this.formularioPracticaModel.aggregate(pipeline);
        return formularios;
    }
    async limpiarFormularios() {
        const pipeline = [];
        const fechaHoy = new Date();
        pipeline.push({ $match: { activo: true } });
        pipeline.push({ $match: { createdAt: { $lte: new Date((0, date_fns_1.format)(fechaHoy, 'yyyy-MM-dd')) } } });
        const formularios = await this.formularioPracticaModel.aggregate(pipeline);
        if (formularios.length !== 0) {
            formularios.forEach(async (formulario) => {
                await this.formularioPracticaModel.findByIdAndUpdate(formulario._id, { activo: false });
            });
        }
        return formularios;
    }
    async imprimirFormulario(data) {
        const { nro_tramite, nro_formulario, fecha, apellido, nombre, dni, tipo } = data;
        var html = tipo === 'Auto' ? fs.readFileSync(this.url_template_auto, 'utf-8') : fs.readFileSync(this.url_template_moto, 'utf-8');
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            footer: {
                height: "28mm",
                contents: {}
            }
        };
        var document = {
            html: html,
            data: {
                url_logo: this.url_logo,
                nro_formulario,
                nro_tramite,
                apellido,
                nombre,
                dni,
                fecha: (0, date_fns_1.format)(new Date(fecha), 'dd/MM/yyyy')
            },
            path: tipo === 'Auto' ? this.url_destino_pdf_auto : this.url_destino_pdf_moto,
            type: "",
        };
        await pdf.create(document, options);
        return 'Formulario generado';
    }
    async crearFormulario(formularioPracticaDTO, querys) {
        const { nro_tramite, apellido, nombre, dni, tipo } = querys;
        const formularios = await this.listarFormularios({ columna: 'createdAt', direccion: -1 });
        let nro_formulario = 0;
        let nro_formulario_string = '';
        if (formularios.length === 0) {
            nro_formulario = 1;
            nro_formulario_string = '000001';
        }
        else {
            nro_formulario = formularios[0].nro_formulario + 1;
            if (nro_formulario < 10)
                nro_formulario_string = '00000' + nro_formulario.toString();
            else if (nro_formulario < 100)
                nro_formulario_string = '0000' + nro_formulario.toString();
            else if (nro_formulario < 1000)
                nro_formulario_string = '000' + nro_formulario.toString();
            else if (nro_formulario < 10000)
                nro_formulario_string = '00' + nro_formulario.toString();
            else if (nro_formulario < 100000)
                nro_formulario_string = '0' + nro_formulario.toString();
        }
        var html = tipo === 'Auto' ? fs.readFileSync(this.url_template_auto, 'utf-8') : fs.readFileSync(this.url_template_moto, 'utf-8');
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            footer: {
                height: "28mm",
                contents: {}
            }
        };
        var document = {
            html: html,
            data: {
                url_logo: this.url_logo,
                nro_formulario: nro_formulario_string,
                nro_tramite,
                apellido,
                nombre,
                dni,
                fecha: (0, date_fns_1.format)(new Date(), 'dd/MM/yyyy')
            },
            path: tipo === 'Auto' ? this.url_destino_pdf_auto : this.url_destino_pdf_moto,
            type: "",
        };
        await pdf.create(document, options);
        const data = Object.assign(Object.assign({}, formularioPracticaDTO), { nro_formulario, nro_formulario_string });
        const formulario = new this.formularioPracticaModel(data);
        return await formulario.save();
    }
    async actualizarFormulario(id, formularioPracticaUpdateDTO) {
        const formulario = await this.formularioPracticaModel.findByIdAndUpdate(id, formularioPracticaUpdateDTO, { new: true });
        return formulario;
    }
};
FormularioPracticaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Formulario-practica')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FormularioPracticaService);
exports.FormularioPracticaService = FormularioPracticaService;
//# sourceMappingURL=formulario-practica.service.js.map