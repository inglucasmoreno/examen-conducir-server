import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImagenDTO } from './dto/imagenes.dto';
import { IImagen } from './interface/imagenes.interface';
import { ImagenUpdateDTO } from './dto/imagenes-update.dto';

@Injectable()
export class ImagenesService {

    constructor(@InjectModel('Imagen') private readonly imagenModel: Model<IImagen>){}

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
        const imagen = new this.imagenModel(imagenDTO);
        return await imagen.save();
    }

    // Actualizar imagen
    async actualizarImagen(id: string, imagenUpdateDTO: ImagenUpdateDTO): Promise<IImagen> {
        const imagen = await this.imagenModel.findByIdAndUpdate(id, imagenUpdateDTO, {new: true});
        return imagen;
    }

}
