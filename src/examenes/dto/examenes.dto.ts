import { IsNotEmpty } from "class-validator"

export class ExamenDTO {
    
    // @IsNotEmpty()
    readonly usuario: string;

    // @IsNotEmpty()
    readonly tipo_licencia: string;

    // @IsNotEmpty()
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

    // @IsNotEmpty()
    readonly estado: string;

    // @IsNotEmpty()
    readonly fecha_rindiendo: Date;

    // @IsNotEmpty()
    readonly fecha_finalizacion: Date;

    // @IsNotEmpty()
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