import { Schema } from 'mongoose';

export const formularioPracticaSchema = new Schema({

    nro_formulario: {
        type: String,
        uppercase: true,
        required: true
    },

    nro_tramite: {
        type: String,
        uppercase: true,
        required: true
    },

    persona: {
        type: Schema.Types.ObjectId,
        uppercase: true,
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

},{ timestamps: true, collection: 'formulario-practica' });