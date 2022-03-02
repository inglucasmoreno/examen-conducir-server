import { Schema } from 'mongoose';

export const reactivacionSchema = new Schema({

    examen: {
        type: Schema.Types.ObjectId,
        ref: 'examen',
        require: 'El examen a reactivar es un campo obligatorio'
    },

    usuario: {
        type: Schema.Types.ObjectId,
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

    // createdAt | updatedAt

},{ timestamps: true, collection: 'reactivaciones' });