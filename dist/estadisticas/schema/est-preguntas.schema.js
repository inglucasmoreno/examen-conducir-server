"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estPreguntaSchema = void 0;
const mongoose_1 = require("mongoose");
exports.estPreguntaSchema = new mongoose_1.Schema({
    examen: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: 'El ID de examen es obligatorio'
    },
    pregunta: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: 'El ID de pregunta es obligatorio'
    },
    correcta: {
        type: Boolean,
        require: 'El campo de correcto-incorrecto es obligatorio'
    }
}, { timestamps: true, collection: 'est-preguntas' });
//# sourceMappingURL=est-preguntas.schema.js.map