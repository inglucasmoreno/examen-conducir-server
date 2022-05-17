"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivacionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.reactivacionSchema = new mongoose_1.Schema({
    examen: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'examen',
        require: 'El examen a reactivar es un campo obligatorio'
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'usuario',
        require: 'El usuario es un campo obligatorio'
    },
    motivo: {
        type: String,
        uppercase: true,
        require: 'El motivo es un campo obligatorio'
    },
    tiempo: {
        type: Number,
        require: 'El tiempo es un campo obligatorio'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, collection: 'reactivaciones' });
//# sourceMappingURL=reactivaciones.schema.js.map