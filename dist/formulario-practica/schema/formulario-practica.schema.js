"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formularioPracticaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.formularioPracticaSchema = new mongoose_1.Schema({
    nro_formulario: {
        type: Number,
        required: true
    },
    nro_formulario_string: {
        type: String,
        required: true
    },
    nro_tramite: {
        type: String,
        uppercase: true,
        required: true
    },
    lugar: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'lugar',
        required: true
    },
    persona: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'persona',
        required: true
    },
    tipo: {
        type: String,
        default: 'Auto'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, collection: 'formulario-practica' });
//# sourceMappingURL=formulario-practica.schema.js.map