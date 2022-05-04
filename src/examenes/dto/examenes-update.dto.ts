
export class ExamenUpdateDTO {
    
    readonly nro_examen: number;

    readonly nro_examen_string: string;

    readonly usuario: string;

    readonly tipo_licencia: string;

    readonly preguntas: [{
        _id: string,
        numero: number,            
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

    estado: string;

    fecha_rindiendo: Date;

    fecha_finalizacion: Date;

    readonly persona: number;

    readonly nota: number;

    readonly reactivado: boolean;

    readonly baja_tiempo: boolean;

    readonly baja_motivo: string;

    readonly tiempo: number;
    
    cantidad_respuestas_correctas: number;
    
    cantidad_respuestas_incorrectas: number;

    aprobado: boolean;

    readonly lugar: string;

    readonly activo: boolean;

}