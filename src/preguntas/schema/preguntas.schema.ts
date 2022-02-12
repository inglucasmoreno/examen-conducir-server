import { Schema } from 'mongoose';

export const preguntaSchema = new Schema({

    descripcion: {  
        type: String,
        require: 'La descripcion de la pregunta es obligatoria',
    },

    imagen: {
        type: String,
        default: ''
    },

    pregunta_img: {
        type: Boolean,
        default: false
    },

    url_img: {
        type: String,
        default: ''
    },

    numero: {
        type: Number,
        default: 1
    },

    frecuencia: {
        type: Number,
        require: 'La frecuencia es un campo obligatorio',
    },

    respuesta_correcta: {
        type: String,
        require: 'La respuesta correcta es un campo obligatorio',      
    },

    respuesta_incorrecta_1: {
        type: String,
        require: 'La respuesta incorrecta 1 es un campo obligatorio',      
    },

    respuesta_incorrecta_2: {
        type: String,
        require: 'La respuesta incorrecta 2 es un campo obligatorio',      
    },
    
    alcance: {
        type: String,
        require: 'El alcance de la pregunta es un campo obligatorio',      
    },

    activo: {
        type: Boolean,
        required: true,
        default: true
    },

},{ timestamps: true });