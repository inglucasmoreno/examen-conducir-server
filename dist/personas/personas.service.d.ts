import { Model } from 'mongoose';
import { IPersona } from './interface/personas.interface';
import { PersonaDTO } from './dto/personas.dto';
export declare class PersonasService {
    private readonly personaModel;
    constructor(personaModel: Model<IPersona>);
    getPersona(id: string): Promise<IPersona>;
    getPersonaDNI(dni: string): Promise<IPersona>;
    listarPersonas(querys: any): Promise<any>;
    crearPersona(personaDTO: PersonaDTO): Promise<IPersona>;
    actualizarPersona(id: string, personaUpdateDTO: any): Promise<IPersona>;
}
