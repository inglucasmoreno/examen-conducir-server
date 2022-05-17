/// <reference types="multer" />
import { ImagenesService } from './imagenes.service';
export declare class ImagenesController {
    private imagenesService;
    constructor(imagenesService: ImagenesService);
    getImagene(res: any, imageID: any): Promise<void>;
    listarImagenes(res: any): Promise<void>;
    subirImagen(file: Express.Multer.File, info: any): Promise<{
        msg: string;
    }>;
    actualizarImagen(res: any, imagenUpdateDTO: any, imagenID: any): Promise<void>;
}
