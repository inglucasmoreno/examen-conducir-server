import { Schema } from 'mongoose';

export const imagenSchema = new Schema({

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

},{ timestamps: true, collection: 'imagenes' });