import { Schema } from 'mongoose';

export const estPreguntaSchema = new Schema({

    examen: {
        type: Schema.Types.ObjectId,
        require: 'El ID de examen es obligatorio'
    },
    
    pregunta: {
        type: Schema.Types.ObjectId,
        require: 'El ID de pregunta es obligatorio'
    },

    correcta: {
        type: Boolean,
        require: 'El campo de correcto-incorrecto es obligatorio'
    }

},{ timestamps: true, collection: 'est-preguntas' });