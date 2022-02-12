import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PreguntaUpdateDTO } from './dto/preguntas-update.dto';
import { PreguntaDTO } from './dto/preguntas.dto';
import { PreguntasService } from './preguntas.service';

@Controller('preguntas')
export class PreguntasController {

    constructor(private preguntasService: PreguntasService){}
    
    // Preguntas por ID
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getPregunta(@Res() res, @Param('id') preguntaID) {
        const pregunta = await this.preguntasService.getPregunta(preguntaID);
        res.status(HttpStatus.OK).json({
            message: 'Pregunta obtenida correctamente',
            pregunta
        });        
    }
    
    // Listar preguntas
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarPreguntas(@Res() res, @Query() querys) {
        const preguntas = await this.preguntasService.listarPreguntas(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de preguntas correcto',
            preguntas
        });             
    }

    // Crear pregunta
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async crearPregunta(@Res() res, @Body() preguntaDTO: PreguntaDTO ) {
        const pregunta = await this.preguntasService.crearPregunta(preguntaDTO);    
        res.status(HttpStatus.OK).json({
            message: 'Pregunta creada correctamente',
            pregunta
        });      
    }

    // Actualizar pregunta
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarPregunta(@Res() res, @Body() preguntaUpdateDTO: PreguntaUpdateDTO, @Param('id') preguntaID ) {    
        const pregunta = await this.preguntasService.actualizarPregunta(preguntaID, preguntaUpdateDTO);
        res.status(HttpStatus.OK).json({
            message: 'Pregunta actualizada correctamente',
            pregunta
        });      
    
    }   

}
