import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LugarUpdateDTO } from './dto/lugares-update.dto';
import { LugarDTO } from './dto/lugares.dto';
import { ILugar } from './interface/lugares.interface';

@Injectable()
export class LugaresService {

    constructor(@InjectModel('Lugar') private readonly lugaresModel: Model<ILugar>){}

    // Lugar por ID
    async getLugar(id: string): Promise<ILugar> {
        const lugar = await this.lugaresModel.findById(id);
        if(!lugar) throw new NotFoundException('El lugar no existe');
        return lugar;
    }  
    
    // Listar lugares
    async listarLugares(querys: any): Promise<ILugar[]> {
        
        const {columna, direccion} = querys;

        // Ordenar
        let ordenar = [columna || 'apellido', direccion || 1];
        
        const lugares = await this.lugaresModel.find()
                                               .sort([ordenar]);
        return lugares;
    }  

    // Crear lugar
    async crearLugar(lugarDTO: LugarDTO): Promise<ILugar> {
        const lugar = new this.lugaresModel(lugarDTO);
        return await lugar.save();
    }

    // Actualizar lugar
    async actualizarLugar(id: string, lugarUpdateDTO: LugarUpdateDTO): Promise<ILugar> {
       
        // Se verifica si el lugar a actualizar existe
        const lugarExiste = await this.getLugar(id);
        if(!lugarExiste) throw new NotFoundException('El lugar no existe');
        
        const persona = await this.lugaresModel.findByIdAndUpdate(id, lugarUpdateDTO, {new: true});
        return persona;
    
    }
      
}
