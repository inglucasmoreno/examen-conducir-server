import { Model } from 'mongoose';
import { ImagenDTO } from './dto/imagenes.dto';
import { IImagen } from './interface/imagenes.interface';
import { ImagenUpdateDTO } from './dto/imagenes-update.dto';
import { IPregunta } from 'src/preguntas/interface/preguntas.interface';
export declare class ImagenesService {
    private readonly imagenModel;
    private readonly preguntaModel;
    constructor(imagenModel: Model<IImagen>, preguntaModel: Model<IPregunta>);
    getImagen(id: string): Promise<IImagen>;
    listarImagenes(): Promise<IImagen[]>;
    nuevaImagen(imagenDTO: ImagenDTO): Promise<IImagen>;
    actualizarImagen(id: string, imagenUpdateDTO: ImagenUpdateDTO): Promise<IImagen>;
}
