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
exports.ExamenesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const preguntas_interface_1 = require("../preguntas/interface/preguntas.interface");
const est_preguntas_interface_1 = require("../estadisticas/interface/est-preguntas.interface");
const date_fns_1 = require("date-fns");
const pdf = require("pdf-creator-node");
const fs = require("fs");
let ExamenesService = class ExamenesService {
    constructor(examenModel, estPreguntasModel, reactivacionModel, preguntaModel) {
        this.examenModel = examenModel;
        this.estPreguntasModel = estPreguntasModel;
        this.reactivacionModel = reactivacionModel;
        this.preguntaModel = preguntaModel;
        this.url_logo = 'http://localhost:' + (process.env.PORT || 3000) + '/pdf/logo.png';
        this.url_imagenes = 'http://localhost:' + (process.env.PORT || 3000) + '/img/';
        this.url_template_examen = process.env.URL_TEMPLATE_EXAMEN || './pdf/template/examen.html';
        this.url_destino_pdf_examen = process.env.URL_DESTINO_PDF_EXAMEN || './public/pdf/examen.pdf';
    }
    async getExamen(id, activo) {
        const idObject = new mongoose.Types.ObjectId(id);
        const pipeline = [];
        pipeline.push({ $match: { _id: idObject } });
        if (activo === 'true') {
            pipeline.push({ $match: { activo: true } });
        }
        else if (activo === 'false') {
            pipeline.push({ $match: { activo: false } });
        }
        pipeline.push({
            $lookup: {
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }
        });
        pipeline.push({ $unwind: '$lugar' });
        pipeline.push({
            $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }
        });
        pipeline.push({ $unwind: '$persona' });
        pipeline.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipeline.push({ $unwind: '$usuario' });
        const examen = await this.examenModel.aggregate(pipeline);
        if (!examen[0])
            throw new common_1.NotFoundException('El examen no existe');
        return examen[0];
    }
    async getExamenDni(dni) {
        const pipeline = [];
        pipeline.push({ $match: { activo: true } });
        pipeline.push({
            $lookup: {
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }
        });
        pipeline.push({ $unwind: '$lugar' });
        pipeline.push({
            $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }
        });
        pipeline.push({ $unwind: '$persona' });
        pipeline.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipeline.push({ $unwind: '$usuario' });
        pipeline.push({ $match: { 'persona.dni': dni } });
        const examen = await this.examenModel.aggregate(pipeline);
        if (!examen[0])
            throw new common_1.NotFoundException('El examen no existe');
        return examen[0];
    }
    async getExamenPersona(persona) {
        const pipeline = [];
        pipeline.push({ $match: { activo: true } });
        const personaObject = new mongoose.Types.ObjectId(persona);
        pipeline.push({ $match: { persona: personaObject } });
        pipeline.push({
            $lookup: {
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }
        });
        pipeline.push({ $unwind: '$lugar' });
        pipeline.push({
            $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }
        });
        pipeline.push({ $unwind: '$persona' });
        pipeline.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipeline.push({ $unwind: '$usuario' });
        const examen = await this.examenModel.aggregate(pipeline);
        return examen[0];
    }
    async limpiarExamenes() {
        const pipeline = [];
        const fechaHoy = new Date();
        pipeline.push({ $match: { activo: true } });
        pipeline.push({ $match: { createdAt: { $lte: new Date((0, date_fns_1.format)(fechaHoy, 'yyyy-MM-dd')) } } });
        const examenes = await this.examenModel.aggregate(pipeline);
        if (examenes.length !== 0) {
            examenes.map(async (examen) => {
                await this.examenModel.findByIdAndUpdate(examen._id, {
                    estado: 'Finalizado',
                    baja_tiempo: true,
                    baja_motivo: 'Finalizado por exceso de tiempo',
                    activo: false
                });
            });
        }
        return examenes;
    }
    async listarExamenesHistorial(querys, data) {
        const { columna, direccion, desde, registerpp, reactivados, bajaTiempo } = querys;
        const { fechaDesde, fechaHasta, lugar, estado, clase, usuario, persona, nro_examen_string, aprobado } = data;
        const pipeline = [];
        const pipelineTotal = [];
        let filtroAprobado = {};
        if (aprobado && aprobado !== '') {
            filtroAprobado = { aprobado: aprobado === 'true' ? true : false };
            pipeline.push({ $match: filtroAprobado });
            pipelineTotal.push({ $match: filtroAprobado });
        }
        let filtroReactivados = {};
        if (reactivados && reactivados !== '') {
            filtroReactivados = { reactivado: reactivados === 'true' ? true : false };
            pipeline.push({ $match: filtroReactivados });
            pipelineTotal.push({ $match: filtroReactivados });
        }
        let filtroBajaTiempo = {};
        if (bajaTiempo && bajaTiempo !== '') {
            filtroBajaTiempo = { baja_tiempo: bajaTiempo === 'true' ? true : false };
            pipeline.push({ $match: filtroBajaTiempo });
            pipelineTotal.push({ $match: filtroBajaTiempo });
        }
        if ((fechaDesde === null || fechaDesde === void 0 ? void 0 : fechaDesde.trim()) !== '') {
            pipeline.push({ $match: { createdAt: { $gte: new Date(fechaDesde) } } });
            pipelineTotal.push({ $match: { createdAt: { $gte: new Date(fechaDesde) } } });
        }
        if ((fechaHasta === null || fechaHasta === void 0 ? void 0 : fechaHasta.trim()) !== '') {
            pipeline.push({ $match: { createdAt: { $lte: new Date((0, date_fns_1.add)(new Date(fechaHasta), { days: 1 })) } } });
            pipelineTotal.push({ $match: { createdAt: { $lte: new Date((0, date_fns_1.add)(new Date(fechaHasta), { days: 1 })) } } });
        }
        if (lugar.trim() !== '') {
            let idLugar = '';
            idLugar = new mongoose.Types.ObjectId(lugar);
            pipeline.push({ $match: { lugar: idLugar } });
            pipelineTotal.push({ $match: { lugar: idLugar } });
        }
        if (nro_examen_string && nro_examen_string !== '') {
            pipeline.push({ $match: { nro_examen_string } });
            pipelineTotal.push({ $match: { nro_examen_string } });
        }
        if (estado && estado !== '') {
            pipeline.push({ $match: { estado } });
            pipelineTotal.push({ $match: { estado } });
        }
        if (clase && clase !== '') {
            pipeline.push({ $match: { tipo_licencia: clase } });
            pipelineTotal.push({ $match: { tipo_licencia: clase } });
        }
        pipeline.push({
            $lookup: {
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }
        });
        pipeline.push({ $unwind: '$lugar' });
        pipeline.push({
            $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }
        });
        pipeline.push({ $unwind: '$persona' });
        pipelineTotal.push({
            $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }
        });
        pipelineTotal.push({ $unwind: '$persona' });
        pipeline.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipeline.push({ $unwind: '$usuario' });
        pipelineTotal.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipelineTotal.push({ $unwind: '$usuario' });
        if (usuario && usuario.trim() !== '') {
            pipeline.push({ $match: { 'usuario.dni': usuario } });
            pipelineTotal.push({ $match: { 'usuario.dni': usuario } });
        }
        if (persona && persona.trim() !== '') {
            pipeline.push({ $match: { 'persona.dni': persona } });
            pipelineTotal.push({ $match: { 'persona.dni': persona } });
        }
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        pipeline.push({ $skip: Number(desde) }, { $limit: Number(registerpp) });
        const [examenes, examenesTotal] = await Promise.all([
            this.examenModel.aggregate(pipeline),
            this.examenModel.aggregate(pipelineTotal)
        ]);
        return {
            examenes,
            totalItems: examenesTotal.length
        };
    }
    async listarExamenes(querys) {
        const { columna, direccion, lugar } = querys;
        let idLugar = '';
        const pipeline = [];
        const fechaDesde = new Date((0, date_fns_1.format)(new Date(), 'MM/dd/yyyy'));
        const fechaHasta = (0, date_fns_1.add)(new Date(fechaDesde), { days: 1 });
        pipeline.push({ $match: { createdAt: { $gte: fechaDesde } } });
        pipeline.push({ $match: { createdAt: { $lte: new Date(fechaHasta) } } });
        if (lugar !== '' && lugar !== undefined)
            idLugar = new mongoose.Types.ObjectId(lugar);
        if (lugar !== '' && lugar !== undefined) {
            pipeline.push({ $match: { lugar: idLugar } });
        }
        pipeline.push({
            $lookup: {
                from: 'lugares',
                localField: 'lugar',
                foreignField: '_id',
                as: 'lugar'
            }
        });
        pipeline.push({ $unwind: '$lugar' });
        pipeline.push({
            $lookup: {
                from: 'personas',
                localField: 'persona',
                foreignField: '_id',
                as: 'persona'
            }
        });
        pipeline.push({ $unwind: '$persona' });
        pipeline.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipeline.push({ $unwind: '$usuario' });
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        const examenes = await this.examenModel.aggregate(pipeline);
        return examenes;
    }
    async crearExamen(examenDTO) {
        let preguntasExamen = [];
        let nroPregunta = 0;
        const regex = new RegExp(examenDTO.tipo_licencia);
        let preguntas = await this.preguntaModel.find({ alcance: regex, activo: true });
        let cantidadPreguntas = 0;
        if (examenDTO.tipo_licencia === 'A' || examenDTO.tipo_licencia === 'B')
            cantidadPreguntas = 50;
        else if (examenDTO.tipo_licencia === 'C' || examenDTO.tipo_licencia === 'D' || examenDTO.tipo_licencia === 'E')
            cantidadPreguntas = 60;
        else if (examenDTO.tipo_licencia === 'G')
            cantidadPreguntas = 14;
        else if (examenDTO.tipo_licencia === 'J')
            cantidadPreguntas = 14;
        else if (examenDTO.tipo_licencia === 'H')
            cantidadPreguntas = 17;
        let cantidad_6 = 0;
        let cantidad_5 = Math.ceil(cantidadPreguntas * 0.35);
        let cantidad_4 = Math.ceil(cantidadPreguntas * 0.25);
        let cantidad_3 = Math.ceil(cantidadPreguntas * 0.20);
        let cantidad_2 = Math.ceil(cantidadPreguntas * 0.15);
        let cantidad_1 = cantidadPreguntas - (cantidad_5 + cantidad_4 + cantidad_3 + cantidad_2);
        let preguntas_frecuencia_6 = preguntas.filter(pregunta => (pregunta.frecuencia == 6));
        let cantidadTotal_6 = preguntas_frecuencia_6.length;
        let preguntas_frecuencia_5 = preguntas.filter(pregunta => (pregunta.frecuencia == 5));
        let cantidadTotal_5 = preguntas_frecuencia_5.length;
        let preguntas_frecuencia_4 = preguntas.filter(pregunta => (pregunta.frecuencia === 4));
        let cantidadTotal_4 = preguntas_frecuencia_4.length;
        let preguntas_frecuencia_3 = preguntas.filter(pregunta => (pregunta.frecuencia === 3));
        let cantidadTotal_3 = preguntas_frecuencia_3.length;
        let preguntas_frecuencia_2 = preguntas.filter(pregunta => (pregunta.frecuencia === 2));
        let cantidadTotal_2 = preguntas_frecuencia_2.length;
        let preguntas_frecuencia_1 = preguntas.filter(pregunta => (pregunta.frecuencia === 1));
        let cantidadTotal_1 = preguntas_frecuencia_1.length;
        if (cantidadTotal_6 > 0) {
            cantidad_6 = cantidadTotal_6;
            cantidad_4 = cantidad_4 - cantidadTotal_6;
        }
        if (cantidadTotal_5 < cantidad_5) {
            const diff = cantidad_5 - cantidadTotal_5;
            cantidad_5 = cantidad_5 - diff;
            cantidad_4 = cantidad_4 + diff;
        }
        if (cantidadTotal_4 < cantidad_4) {
            const diff = cantidad_4 - cantidadTotal_4;
            cantidad_4 = cantidad_4 - diff;
            cantidad_3 = cantidad_3 + diff;
        }
        if (cantidadTotal_3 < cantidad_3) {
            const diff = cantidad_3 - cantidadTotal_3;
            cantidad_3 = cantidad_3 - diff;
            cantidad_2 = cantidad_2 + diff;
        }
        if (cantidadTotal_2 < cantidad_2) {
            const diff = cantidad_2 - cantidadTotal_2;
            cantidad_2 = cantidad_2 - diff;
            cantidad_1 = cantidad_1 + diff;
        }
        if (cantidadTotal_6 > 0) {
            for (var i = 0; i < cantidad_6; i++) {
                const nroAleatorio = Math.floor(Math.random() * cantidadTotal_6);
                const randomElement = preguntas_frecuencia_6[nroAleatorio];
                nroPregunta += 1;
                randomElement.numero = nroPregunta;
                preguntasExamen.push(randomElement);
                preguntas_frecuencia_6.splice(nroAleatorio, 1);
                cantidadTotal_6 -= 1;
            }
        }
        for (var i = 0; i < cantidad_5; i++) {
            const nroAleatorio = Math.floor(Math.random() * cantidadTotal_5);
            const randomElement = preguntas_frecuencia_5[nroAleatorio];
            nroPregunta += 1;
            randomElement.numero = nroPregunta;
            preguntasExamen.push(randomElement);
            preguntas_frecuencia_5.splice(nroAleatorio, 1);
            cantidadTotal_5 -= 1;
        }
        for (var i = 0; i < cantidad_4; i++) {
            const nroAleatorio = Math.floor(Math.random() * cantidadTotal_4);
            const randomElement = preguntas_frecuencia_4[nroAleatorio];
            nroPregunta += 1;
            randomElement.numero = nroPregunta;
            preguntasExamen.push(randomElement);
            preguntas_frecuencia_4.splice(nroAleatorio, 1);
            cantidadTotal_4 -= 1;
        }
        for (var i = 0; i < cantidad_3; i++) {
            const nroAleatorio = Math.floor(Math.random() * cantidadTotal_3);
            const randomElement = preguntas_frecuencia_3[nroAleatorio];
            nroPregunta += 1;
            randomElement.numero = nroPregunta;
            preguntasExamen.push(randomElement);
            preguntas_frecuencia_3.splice(nroAleatorio, 1);
            cantidadTotal_3 -= 1;
        }
        for (var i = 0; i < cantidad_2; i++) {
            const nroAleatorio = Math.floor(Math.random() * cantidadTotal_2);
            const randomElement = preguntas_frecuencia_2[nroAleatorio];
            nroPregunta += 1;
            randomElement.numero = nroPregunta;
            preguntasExamen.push(randomElement);
            preguntas_frecuencia_2.splice(nroAleatorio, 1);
            cantidadTotal_2 -= 1;
        }
        for (var i = 0; i < cantidad_1; i++) {
            const nroAleatorio = Math.floor(Math.random() * cantidadTotal_1);
            const randomElement = preguntas_frecuencia_1[nroAleatorio];
            nroPregunta += 1;
            randomElement.numero = nroPregunta;
            preguntasExamen.push(randomElement);
            preguntas_frecuencia_1.splice(nroAleatorio, 1);
            cantidadTotal_1 -= 1;
        }
        let data = examenDTO;
        data.preguntas = preguntasExamen;
        const examenes = await this.examenModel.find().sort({ nro_examen: -1 });
        console.log(examenes);
        let nro_examen = 0;
        let nro_examen_string = '';
        if (examenes.length === 0) {
            nro_examen = 1;
            nro_examen_string = '000001';
        }
        else {
            nro_examen = examenes[0].nro_examen + 1;
            if (nro_examen < 10)
                nro_examen_string = '00000' + nro_examen.toString();
            else if (nro_examen < 100)
                nro_examen_string = '0000' + nro_examen.toString();
            else if (nro_examen < 1000)
                nro_examen_string = '000' + nro_examen.toString();
            else if (nro_examen < 10000)
                nro_examen_string = '00' + nro_examen.toString();
            else if (nro_examen < 100000)
                nro_examen_string = '0' + nro_examen.toString();
        }
        data.nro_examen = nro_examen;
        data.nro_examen_string = nro_examen_string;
        const examen = new this.examenModel(data);
        await examen.save();
        return 'Examen generado correctamente';
    }
    async actualizarExamen(id, examenUpdateDTO) {
        const examen = await this.examenModel.findByIdAndUpdate(id, examenUpdateDTO, { new: true });
        return examen;
    }
    async listarReactivaciones(examenID, querys) {
        const { columna, direccion } = querys;
        const pipeline = [];
        pipeline.push({ $match: { examen: new mongoose.Types.ObjectId(examenID) } });
        pipeline.push({
            $lookup: {
                from: 'usuarios',
                localField: 'usuario',
                foreignField: '_id',
                as: 'usuario'
            }
        });
        pipeline.push({ $unwind: '$usuario' });
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        const reactivaciones = await this.reactivacionModel.aggregate(pipeline);
        return reactivaciones;
    }
    async reactivarExamen(id, examenUpdateDTO) {
        const { usuario, persona, tiempo, motivo } = examenUpdateDTO;
        const examenExiste = await this.examenModel.findOne({ persona, activo: true });
        if (examenExiste)
            throw new common_1.NotFoundException('Ya existe un examen habilitado para esta persona');
        const examen = await this.examenModel.findByIdAndUpdate(id, examenUpdateDTO, { new: true });
        const reactivacion = new this.reactivacionModel({
            examen: id,
            usuario,
            motivo,
            tiempo,
        });
        await reactivacion.save();
        return examen;
    }
    async finalizarExamen(id, examenUpdateDTO) {
        const examenDB = await this.getExamen(id, '');
        var cantidad_correctas = 0;
        var cantidad_incorrectas = 0;
        examenUpdateDTO.preguntas.map(async (pregunta) => {
            const correcta = pregunta.seleccionada === 'respuesta_correcta';
            correcta ? cantidad_correctas += 1 : cantidad_incorrectas += 1;
            const estPregunta = new this.estPreguntasModel({
                examen: id,
                pregunta: pregunta._id,
                correcta
            });
            estPregunta.save();
        });
        if ((examenDB.tipo_licencia === 'A' || examenDB.tipo_licencia === 'B') && cantidad_correctas >= 45)
            examenUpdateDTO.aprobado = true;
        if ((examenDB.tipo_licencia === 'C' || examenDB.tipo_licencia === 'D' || examenDB.tipo_licencia === 'E') && cantidad_correctas >= 54)
            examenUpdateDTO.aprobado = true;
        if (examenDB.tipo_licencia === 'G' && cantidad_correctas >= 13)
            examenUpdateDTO.aprobado = true;
        if (examenDB.tipo_licencia === 'J' && cantidad_correctas >= 13)
            examenUpdateDTO.aprobado = true;
        if (examenDB.tipo_licencia === 'H' && cantidad_correctas >= 16)
            examenUpdateDTO.aprobado = true;
        examenUpdateDTO.cantidad_respuestas_correctas = cantidad_correctas;
        examenUpdateDTO.cantidad_respuestas_incorrectas = cantidad_incorrectas;
        examenUpdateDTO.preguntas.map(pregunta => {
            if (!pregunta.seleccion_correcta && pregunta.eliminatoria)
                examenUpdateDTO.aprobado = false;
        });
        return examenUpdateDTO;
    }
    async imprimirExamen(examen) {
        var html = fs.readFileSync(this.url_template_examen, 'utf-8');
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            footer: {
                height: "28mm",
                contents: {}
            }
        };
        let preguntas = [];
        examen.preguntas.map(pregunta => {
            if (pregunta.url_img !== '')
                pregunta.url_img = this.url_imagenes + pregunta.url_img;
            preguntas.push(pregunta);
        });
        var document = {
            html: html,
            data: {
                url_logo: this.url_logo,
                examen,
                preguntas,
                fecha: (0, date_fns_1.format)(new Date(examen.createdAt), 'dd/MM/yyyy'),
                totalPreguntas: preguntas.length
            },
            path: this.url_destino_pdf_examen,
            type: "",
        };
        await pdf.create(document, options);
    }
    async eliminarExamen(id) {
        const examenBD = await this.examenModel.findById(id);
        if (!examenBD.activo)
            throw new common_1.NotFoundException('El examen ya fue presentado, no puedes eliminarlo');
        const examen = await this.examenModel.findByIdAndRemove(id);
        return examen;
    }
    async estadisticasExamenes(querys) {
        const { fechaDesde, fechaHasta, } = querys;
        const pipeline = [];
        pipeline.push({ $match: { estado: 'Finalizado' } });
        if ((fechaDesde === null || fechaDesde === void 0 ? void 0 : fechaDesde.trim()) !== '') {
            pipeline.push({ $match: { createdAt: { $gte: new Date(fechaDesde) } } });
        }
        if ((fechaHasta === null || fechaHasta === void 0 ? void 0 : fechaHasta.trim()) !== '') {
            pipeline.push({ $match: { createdAt: { $lte: new Date((0, date_fns_1.add)(new Date(fechaHasta), { days: 1 })) } } });
        }
        pipeline.push({
            $group: {
                _id: null,
                total_examenes: { $sum: 1 },
                examenes_aprobados: { $sum: { $cond: [{ $eq: ["$aprobado", true] }, 1, 0] } },
                examenes_desaprobados: { $sum: { $cond: [{ $eq: ["$aprobado", false] }, 1, 0] } },
            }
        });
        const estadisticas = await this.examenModel.aggregate(pipeline);
        return {
            total_examenes: estadisticas.length !== 0 ? estadisticas[0].total_examenes : 0,
            examenes_aprobados: estadisticas.length !== 0 ? estadisticas[0].examenes_aprobados : 0,
            examenes_desaprobados: estadisticas.length !== 0 ? estadisticas[0].examenes_desaprobados : 0,
        };
    }
};
ExamenesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Examen')),
    __param(1, (0, mongoose_1.InjectModel)('Est-preguntas')),
    __param(2, (0, mongoose_1.InjectModel)('Reactivacion')),
    __param(3, (0, mongoose_1.InjectModel)('Pregunta')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ExamenesService);
exports.ExamenesService = ExamenesService;
//# sourceMappingURL=examenes.service.js.map