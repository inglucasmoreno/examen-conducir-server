import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {

    constructor(private estadisticasService: EstadisticasService){}

    // Estadisticas de preguntas
    @Get('/preguntas')
    async getImagene(@Res() res, @Query() querys) {
        const estadisticas = await this.estadisticasService.preguntas(querys);
        res.status(HttpStatus.OK).json({
            message: 'Estadisticas de preguntas obtenidas correctamente',
            estadisticas
        });  
    } 
}
