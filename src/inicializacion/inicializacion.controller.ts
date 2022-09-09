import { Controller, Get, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { InicializacionService } from './inicializacion.service';

@Controller('inicializacion')
export class InicializacionController {

    constructor(private inicializacionService: InicializacionService){}

    // Inicializacion de preguntas
    @Get('/preguntas')
    async initPreguntas(@Res() res){
        await this.inicializacionService.initPreguntas();
        res.status(HttpStatus.OK).json({
            message: 'Inicializacion de preguntas completada correctamente'
        })
    }

    // Inicializacion de usuario
    @Get('/usuarios')
    async initUsuarios(@Res() res){
        await this.inicializacionService.initUsuarios();
        res.status(HttpStatus.OK).json({
            message: 'Inicializacion de usuarios completado correctamente'
        })
    }

    // Importacion de preguntas - Archivo excel (.xlsx)
    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                storage: diskStorage({
                    destination: './importar',
                    filename: function(req, file, cb){
                        cb(null, 'preguntas.xlsx')
                    }
                })
            }
        )
    )
    @Post('/preguntas')
    async importarPreguntas(@UploadedFile() file: Express.Multer.File, @Query() query: any) {
        
        const msg = await this.inicializacionService.importarPreguntas(query);

        return {
            msg
        }

    }    

}
