import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPersona } from 'src/personas/interface/personas.interface';
import axios from 'axios';

@Injectable()
export class SigemService {

    constructor(@InjectModel('Personas') private readonly personasModel: Model<IPersona>) { };

    // Autenticacion
    async autenticacion(): Promise<any> {
  
      const respuesta = await axios.post('https://sigem.sanluislaciudad.gob.ar/sigem/comunicacionExterna/login', {},{
        headers: {
          username: process.env.SIGEM_USUARIO || '',
          password: process.env.SIGEM_PASSWORD || ''   
        }
      });
  
      return respuesta.data;
  
    }
    
    // Persona por DNI
    async getPersona(data: any): Promise<any> {
  
      const { dni, userCreator, userUpdator } = data;
  
      const dataAuthentication = await this.autenticacion();
      
      const respuesta: any = await axios.post('https://sigem.sanluislaciudad.gob.ar/sigem/comunicacionExterna/getInfoPersona', { dni: Number(dni) },
      { headers: { accesstoken: dataAuthentication.accesstoken } });
  
      let persona: any = null;
      let success: boolean = false;
  
      if(respuesta.data.success){ // SIGEM - RESPUESTA CORRECTA
    
        const personaDB = await this.personasModel.findOne({ dni });
        success = true;
  
        if(personaDB){ // Actualizar datos
          
          const dataUpdate = {
            apellido: respuesta.data.informacion.apellido,
            nombre: respuesta.data.informacion.nombre,
            dni: respuesta.data.informacion.dni,
            sigem: true,
            userUpdator: data.updatorUser,
          }
  
          persona = await this.personasModel.findOneAndUpdate({ dni }, dataUpdate, {new: true});
          console.log(persona);
  
        }else{ // Se crea el usuario en el sistema
  
          const dataCreator = {
            ...respuesta.data.informacion,
            sigem: true,
            userCreator,
            userUpdator
          }
  
          const nuevaPersona = new this.personasModel(dataCreator);
          
          persona = await nuevaPersona.save();
          
        }
  
      } else {  // SIGEM - RESPUESTA INCORRECTA
  
        persona = await this.personasModel.findOne({ dni });
        if(persona) success = true;
      
      }
  
      // return respuesta.data;
  
      return {
        persona,
        success
      }
  
    } 

}




