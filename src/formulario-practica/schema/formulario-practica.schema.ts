import { Schema } from 'mongoose';

export const formularioPracticaSchema = new Schema({

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
        type: Schema.Types.ObjectId,
        ref: 'lugar',
        required: true
    },

    persona: {
        type: Schema.Types.ObjectId,
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

},{ timestamps: true, collection: 'formulario-practica' });