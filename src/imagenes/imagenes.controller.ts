import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ImagenesService } from './imagenes.service';

@Controller('imagenes')
export class ImagenesController {

   constructor( private imagenesService: ImagenesService ){}


   // Obtener imagen por ID
   @Get('/:id')
   async getImagene(@Res() res, @Param('id') imageID) {
      const imagen = await this.imagenesService.getImagen(imageID);
      res.status(HttpStatus.OK).json({
         message: 'Imagen obtenida correctamente',
         imagen
     });  
   } 

   // Listar imagenes
   @Get('/')
   async listarImagenes(@Res() res) {
      const imagenes = await this.imagenesService.listarImagenes();
      res.status(HttpStatus.OK).json({
         message: 'Listado de imagenes correcto',
         imagenes
     });  
   }   

   // Subir imagen
   @Post('/')
   @UseInterceptors(
      FileInterceptor(
         'file',
         {
            storage: diskStorage({
               // destination: './public/img',
               destination: '../public/img',
               filename: function(req, file, cb){
                  const formato = file.mimetype.split('/')[1];
                  cb(null, uuidv4() + '.' + formato);
               }
            })
         }
      )
   )
   async subirImagen(@UploadedFile() file: Express.Multer.File, @Body() info: any) {
      
      // Almacenamiento en la base de datos - Informacion de la imagen
      const data = {
         descripcion: info.descripcion,
         url: file.filename, 
         activo: true
      };
      
      const imagen = await this.imagenesService.nuevaImagen(data);

      return {
         msg: `Archivo ${file.filename} cargado correctamente`
      }

   }   

   // Actualizar imagen
   @Put('/:id')
   async actualizarImagen(@Res() res, @Body() imagenUpdateDTO: any, @Param('id') imagenID ) {
       
       const imagen = await this.imagenesService.actualizarImagen(imagenID, imagenUpdateDTO);
       
       res.status(HttpStatus.OK).json({
           message: 'Imagen actualizada correctamente',
           imagen
       });      
    
   }

}
