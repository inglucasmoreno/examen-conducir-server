import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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

}
