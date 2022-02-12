import { Document } from 'mongoose';

export interface IExamen extends Document {
    readonly usuario: string;

    readonly tipo_licencia: string;

    readonly preguntas: [{
        pregunta: string,
        descripcion: string,
        imagen: string,
        pregunta_img: boolean,
        url_img: string,
        respuesta_correcta: string,
        respuesta_incorrecta_1: string,
        respuesta_incorrecta_2: string,
        seleccionada: string             // -> correcta | incorrecta_1 | incorrecta_2   
        seleccion_correcta: boolean
    }];

    readonly _id: string;

    readonly nota: number;
    
    readonly cantidad_respuestas_correctas: number;
    
    readonly cantidad_respuestas_incorrectas: number;

    readonly aprobado: boolean;

    readonly lugar: string;

    readonly activo: boolean;

    // Estadisticas
    
    readonly est_cantidad_total: number;
    
    readonly est_cantidad_correctas: number;
    
    readonly est_cantidad_incorrectas: number;
}
