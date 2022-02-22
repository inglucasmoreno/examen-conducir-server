import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LugarUpdateDTO } from './dto/lugares-update.dto';
import { LugarDTO } from './dto/lugares.dto';
import { ILugar } from './interface/lugares.interface';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';

@Injectable()
export class LugaresService {

    constructor(
        @InjectModel('Lugar') private readonly lugaresModel: Model<ILugar>,
        @InjectModel('Usuario') private readonly usuariosModel: Model<IUsuario>    
    ){}

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
        
        const { descripcion } = lugarDTO;

        // Existe otro lugar con la misma descripcion?
        const lugarDB = await this.lugaresModel.findOne({ descripcion: descripcion.toLocaleUpperCase() });
        if(lugarDB) throw new NotFoundException('Ya existe un lugar con esa descripción');
        
        const lugar = new this.lugaresModel(lugarDTO);


        return await lugar.save();
    }

    // Actualizar lugar
    async actualizarLugar(id: string, lugarUpdateDTO: LugarUpdateDTO): Promise<ILugar> {
       
        const { activo, descripcion } = lugarUpdateDTO;

        // Se verifica si el lugar a actualizar existe
        const lugarExiste = await this.getLugar(id);
        if(!lugarExiste) throw new NotFoundException('El lugar no existe');
        
        // Se va a dar de baja?
        if(activo !== undefined && !activo){
            // Hay algun usuario asignado a este lugar?
            const usuario = await this.usuariosModel.findOne({ lugar: id });
            if(usuario) throw new NotFoundException('Hay usuarios asignados a este lugar');
        }
        
        if(lugarExiste.descripcion !== descripcion){
            // Ya existe otro lugar con el mismo nombre?
            const lugarDB = await this.lugaresModel.findOne({ descripcion });
            if(lugarDB) throw new NotFoundException('Ya existe un lugar con esa descripción');
        }
        

        const lugar = await this.lugaresModel.findByIdAndUpdate(id, lugarUpdateDTO, {new: true});
        return lugar;
    
    }
      
}
