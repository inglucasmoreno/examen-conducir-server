import { SigemService } from './sigem.service';
export declare class SigemController {
    private sigemService;
    constructor(sigemService: SigemService);
    insert(res: any): Promise<void>;
    getPersona(res: any, data: any): Promise<void>;
}
