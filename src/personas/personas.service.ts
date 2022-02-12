import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPersona } from './interface/personas.interface';
import { PersonaDTO } from './dto/personas.dto';
import { PersonaUpdateDTO } from './dto/personas-update.dto';

@Injectable()
export class PersonasService {
    
    constructor(@InjectModel('Persona') private readonly personaModel: Model<IPersona>){}
    
    // Persona por ID
    async getPersona(id: string): Promise<IPersona> {
        const persona = await this.personaModel.findById(id);
        if(!persona) throw new NotFoundException('La persona no existe');
        return persona;
    }  
    
    // Persona por DNI
    async getPersonaDNI(dni: string): Promise<IPersona> {
        const persona = await this.personaModel.findOne({ dni });
        return persona;
    }

    // Listar personas
    async listarPersonas(querys: any): Promise<IPersona[]> {

        const {columna, direccion} = querys;

        // Ordenar
        let ordenar = [columna || 'apellido', direccion || 1];

        const personas = await this.personaModel.find()
                                                .sort([ordenar]);
                                            
        return personas;
    }  

    // Crear persona
    async crearPersona(personaDTO: PersonaDTO): Promise<IPersona> {

        const { dni } = personaDTO; 

        // Se verifica si el DNI esta registrado
        let personaDB = await this.getPersonaDNI(dni);
        if(personaDB) throw new NotFoundException('El DNI ya esta registrado');

        const persona = new this.personaModel(personaDTO);
        return await persona.save();
    }

    // Actualizar persona
    async actualizarPersona(id: string, personaUpdateDTO: PersonaUpdateDTO): Promise<IPersona> {

        const { dni } = personaUpdateDTO;

        // Se verifica si la persona a actualizar existe
        let personaDB = await this.getPersona(id);
        if(!personaDB) throw new NotFoundException('La persona no existe');
        
        // Se verifica si el DNI ya esta cargado (En caso de que sea necesario)
        if(dni && dni !== personaDB.dni){
            personaDB = await this.getPersonaDNI(dni);
            if(personaDB) throw new NotFoundException('El DNI ya esta registrado');
        }

        const persona = await this.personaModel.findByIdAndUpdate(id, personaUpdateDTO, {new: true});
        return persona;
    
    }

}
