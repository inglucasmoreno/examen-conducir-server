import { PreguntaUpdateDTO } from './dto/preguntas-update.dto';
import { PreguntaDTO } from './dto/preguntas.dto';
import { PreguntasService } from './preguntas.service';
export declare class PreguntasController {
    private preguntasService;
    constructor(preguntasService: PreguntasService);
    getPregunta(res: any, preguntaID: any): Promise<void>;
    listarPreguntas(res: any, querys: any): Promise<void>;
    crearPregunta(res: any, preguntaDTO: PreguntaDTO): Promise<void>;
    actualizarPregunta(res: any, preguntaUpdateDTO: PreguntaUpdateDTO, preguntaID: any): Promise<void>;
}
