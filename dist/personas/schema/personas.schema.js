"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.personaSchema = new mongoose_1.Schema({
    apellido: {
        type: String,
        require: 'El apellido es un campo obligatorio',
        uppercase: true,
        trim: true
    },
    nombre: {
        type: String,
        require: 'El nombre es un campo obligatorio',
        uppercase: true,
        trim: true
    },
    dni: {
        type: String,
        require: 'El DNI es un campo obligatorio',
        unique: true,
        trim: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
//# sourceMappingURL=personas.schema.js.map