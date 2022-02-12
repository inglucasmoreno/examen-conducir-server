import { Schema } from 'mongoose';

export const personaSchema = new Schema({
   
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

},{ timestamps: true });