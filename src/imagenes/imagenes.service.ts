import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImagenDTO } from './dto/imagenes.dto';
import { IImagen } from './interface/imagenes.interface';
import { ImagenUpdateDTO } from './dto/imagenes-update.dto';
import { IPregunta } from 'src/preguntas/interface/preguntas.interface';

@Injectable()
export class ImagenesService {

    constructor(
        @InjectModel('Imagen') private readonly imagenModel: Model<IImagen>,
        @InjectModel('Pregunta') private readonly preguntaModel: Model<IPregunta>    
    ){}

    // Obtener imagen por ID
    async getImagen(id: string): Promise<IImagen> {
        const imagen = await this.imagenModel.findById(id);
        return imagen;
    }

    // Listado de imagenes
    async listarImagenes(): Promise<IImagen[]> {
        const imagenes = await this.imagenModel.find().sort({ descripcion: 1 });
        return imagenes;
    }

    // Nueva imagen
    async nuevaImagen(imagenDTO: ImagenDTO): Promise<IImagen> {
        
        const { descripcion } = imagenDTO;
        
        const imagenDB = await this.imagenModel.findOne({ descripcion: descripcion.toLocaleUpperCase() });
        if(imagenDB) throw new NotFoundException('Ya existe una imagen con esa descripción');
    
        const imagen = new this.imagenModel(imagenDTO);
        return await imagen.save();
    }

    // Actualizar imagen
    async actualizarImagen(id: string, imagenUpdateDTO: ImagenUpdateDTO): Promise<IImagen> {
        
        const { activo, descripcion } = imagenUpdateDTO;

        // La imagen a actualizar existe?
        const imagenDB = await this.imagenModel.findById(id);
        if(!imagenDB) throw new NotFoundException('La imagen a actualizar no existe');

        // Se va a dar de baja?
        if(activo !== undefined && activo === false){
            const pregunta = await this.preguntaModel.findOne({ imagen: id });
            if(pregunta) throw new NotFoundException('La imagen esta asociada a una pregunta');             
        }
        
        // Existe otra imagen con la misma descripcion?
        if(descripcion !== undefined && imagenDB.descripcion !== descripcion){
           const imagenExiste = await this.imagenModel.findOne({ descripcion: descripcion.toLocaleUpperCase() });
           if(imagenExiste) throw new NotFoundException('Ya existe una imagen con esa descripción');     
        }

        const imagen = await this.imagenModel.findByIdAndUpdate(id, imagenUpdateDTO, {new: true});
        return imagen;
    }

}
