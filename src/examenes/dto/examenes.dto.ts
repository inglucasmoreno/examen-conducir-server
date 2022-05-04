export class ExamenDTO {
    
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

    readonly estado: string;

    readonly fecha_rindiendo: Date;

    readonly fecha_finalizacion: Date;

    readonly persona: string;

    readonly nota: number;

    readonly reactivado: boolean;

    readonly baja_tiempo: boolean;

    readonly baja_motivo: string;

    readonly tiempo: number;
    
    readonly cantidad_respuestas_correctas: number;
    
    readonly cantidad_respuestas_incorrectas: number;

    readonly aprobado: boolean;

    // @IsNotEmpty()
    readonly lugar: string;

    readonly activo: boolean;

    // Estadisticas
    readonly est_cantidad_total: number;
    readonly est_cantidad_correctas: number;
    readonly est_cantidad_incorrectas: number;

}