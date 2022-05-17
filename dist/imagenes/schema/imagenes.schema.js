"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.imagenSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        uppercase: true,
        require: 'La descripcion es un campo obligatorio'
    },
    url: {
        type: String,
        require: 'La url es un campo obligatorio'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, collection: 'imagenes' });
//# sourceMappingURL=imagenes.schema.js.map