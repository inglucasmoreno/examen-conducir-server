import { PersonaDTO } from './dto/personas.dto';
import { PersonasService } from './personas.service';
import { PersonaUpdateDTO } from './dto/personas-update.dto';
export declare class PersonasController {
    private personasService;
    constructor(personasService: PersonasService);
    getPersona(res: any, personaID: any): Promise<void>;
    getPersonaDNI(res: any, personaDNI: any): Promise<void>;
    listarPersonas(res: any, querys: any): Promise<void>;
    crearPersona(res: any, personaDTO: PersonaDTO): Promise<void>;
    actualizarPersona(res: any, personaUpdateDTO: PersonaUpdateDTO, personaID: any): Promise<void>;
}
