import { Schema } from 'mongoose';

export const examenSchema = new Schema({

    nro_examen: {
        type: Number,
        require: 'El numero de examen es obligatorio'
    },

    nro_examen_string: {
        type: String,
        require: 'La cadena del numero de formulario es obligatorio'
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        require: 'El usuario es un campo obligatorio'
    },

    tipo_licencia: {
        type: String,
        require: 'El tipo de licencia es un campo obligatorio'
    },

    persona: {
        type: Schema.Types.ObjectId,
        ref: 'persona',
        require: 'La persona es un campo obligatorio'
    },

    lugar: {
        type: Schema.Types.ObjectId,
        ref: 'lugar',
        require: 'El lugar es un campo obligatorio'
    },

    preguntas: [
        {
            _id: Schema.Types.ObjectId,                    // ID -> Pregunta
            numero: Number,
            imagen: String,
            pregunta_img: Boolean,
            url_img: String,
            descripcion: String,
            respuesta_correcta: String,
            respuesta_incorrecta_1: String,
            respuesta_incorrecta_2: String,
            seleccionada: {
                type: String,
                default: ''
            },
            seleccion_correcta: {
                type: String,
                default: false
            }
        }
    ],

    estado: {
        type: String,
        default: 'Creado' // Creado | Rindiendo | Finalizado
    },

    fecha_rindiendo: {
        type: Date,
        default: Date.now()
    },

    fecha_finalizacion: {
        type: Date,
        default: Date.now()
    },

    nota: {
        type: Number,
        default: 0
    },

    reactivado: {
        type: Boolean,
        default: false
    },

    baja_tiempo: {
        type: Boolean,
        default: false
    },

    baja_motivo: {
        type: String,
        default: ''
    },

    tiempo : {
        type: Number,
        default: 30 
    },

    cantidad_respuestas_correctas: {
        type: Number,
        default: 0
    },

    cantidad_respuestas_incorrectas: {
        type: Number,
        default: 0
    },

    aprobado: {
        type: Boolean,
        default: false
    },  

    activo: {
        type: Boolean,
        default: true
    }

},{ timestamps: true, collection: 'examenes' });