import { Schema } from 'mongoose';

export const lugarSchema = new Schema({

    descripcion: {
        type: String,
        uppercase: true,
        require: 'La descripcion es obligatoria'
    },

    activo: {
        type: Boolean,
        default: true
    }

},{ timestamps: true, collection: 'lugares' });