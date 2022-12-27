import { Model } from 'mongoose';
import { IPersona } from 'src/personas/interface/personas.interface';
export declare class SigemService {
    private readonly personasModel;
    constructor(personasModel: Model<IPersona>);
    autenticacion(): Promise<any>;
    getPersona(data: any): Promise<any>;
}
