"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lugarSchema = void 0;
const mongoose_1 = require("mongoose");
exports.lugarSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        uppercase: true,
        require: 'La descripcion es obligatoria'
    },
    activo: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, collection: 'lugares' });
//# sourceMappingURL=lugares.schema.js.map