import { Model } from 'mongoose';
import { IPersona } from './interface/personas.interface';
import { PersonaDTO } from './dto/personas.dto';
import { PersonaUpdateDTO } from './dto/personas-update.dto';
export declare class PersonasService {
    private readonly personaModel;
    constructor(personaModel: Model<IPersona>);
    getPersona(id: string): Promise<IPersona>;
    getPersonaDNI(dni: string): Promise<IPersona>;
    listarPersonas(querys: any): Promise<IPersona[]>;
    crearPersona(personaDTO: PersonaDTO): Promise<IPersona>;
    actualizarPersona(id: string, personaUpdateDTO: PersonaUpdateDTO): Promise<IPersona>;
}
