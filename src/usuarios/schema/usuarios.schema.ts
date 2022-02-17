
import { model, Schema, Types } from 'mongoose';

export const usuarioSchema = new Schema({
   
    usuario: {
        type: String,
        require: 'El usuario es un campo obligatorio',
        trim: true
    },

    dni: {
        type: String,
        require: 'El DNI es un campo obligatorio',
        trim: true
    },

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

    password: {
        type: String,
        require: 'El password es un campo obligatorio',
        trim: true
    },

    email: {
        type: String,
        lowercase: true,
        default: '',
        trim: true
    },

    role: {
        type: String,
        default: 'ADMIN_ROLE',
        trim: true
    },

    permisos: [
        {
            type: String,
            uppercase: true,
            trim: true
        }
    ],

    lugar: {
        type: Schema.Types.ObjectId,
        require: 'El lugar es obligatorio',
        ref: 'lugares'  
    },

    activo: {
        type: Boolean,
        required: true,
        default: true
    }

},{ timestamps: true });
