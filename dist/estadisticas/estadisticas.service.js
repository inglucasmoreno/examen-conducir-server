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
exports.EstadisticasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EstadisticasService = class EstadisticasService {
    constructor(estPreguntasModel) {
        this.estPreguntasModel = estPreguntasModel;
    }
    async preguntas(querys) {
        const { columna, direccion, desde, registerpp, activo, parametro, } = querys;
        let pipeline = [];
        let pipelineTotal = [];
        pipeline.push({ $match: {} });
        pipelineTotal.push({ $match: {} });
        let filtroActivo = {};
        if (activo && activo !== '') {
            filtroActivo = { activo: activo === 'true' ? true : false };
            pipeline.push({ $match: filtroActivo });
            pipelineTotal.push({ $match: filtroActivo });
        }
        if (parametro && parametro !== '') {
            const porPartes = parametro.split(' ');
            let parametroFinal = '';
            for (var i = 0; i < porPartes.length; i++) {
                if (i > 0)
                    parametroFinal = parametroFinal + porPartes[i] + '.*';
                else
                    parametroFinal = porPartes[i] + '.*';
            }
            const regex = new RegExp(parametroFinal, 'i');
            pipeline.push({ $match: { $or: [{ numero: Number(parametro) }, { descripcion: regex }] } });
            pipelineTotal.push({ $match: { $or: [{ numero: Number(parametro) }, { descripcion: regex }] } });
        }
        pipeline.push({
            $lookup: {
                from: 'examenes',
                localField: 'examen',
                foreignField: '_id',
                as: 'examen'
            }
        });
        pipeline.push({ $unwind: '$examen' });
        pipeline.push({
            $lookup: {
                from: 'preguntas',
                localField: 'pregunta',
                foreignField: '_id',
                as: 'pregunta'
            }
        });
        pipeline.push({ $unwind: '$pregunta' });
        pipeline.push({
            $group: {
                _id: { pregunta: "$pregunta" },
                cantidad_correctas: { $sum: { $cond: [{ $eq: ["$correcta", true] }, 1, 0] } },
                cantidad_incorrectas: { $sum: { $cond: [{ $eq: ["$correcta", false] }, 1, 0] } },
                cantidad_total: { $sum: 1 }
            }
        });
        const ordenar = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }
        pipeline.push({ $skip: Number(desde) }, { $limit: Number(registerpp) });
        const [estadisticas, estadisticasTotal] = await Promise.all([
            this.estPreguntasModel.aggregate(pipeline),
            this.estPreguntasModel.aggregate(pipelineTotal),
        ]);
        return {
            estadisticas,
            totalItems: estadisticasTotal.length
        };
    }
};
EstadisticasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Est-preguntas')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EstadisticasService);
exports.EstadisticasService = EstadisticasService;
//# sourceMappingURL=estadisticas.service.js.map