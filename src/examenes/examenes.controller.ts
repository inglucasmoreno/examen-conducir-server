import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExamenDTO } from './dto/examenes.dto';
import { ExamenesService } from './examenes.service';

@Controller('examenes')
export class ExamenesController {

    constructor(private examenesService: ExamenesService){}
    
    // Examen por ID
    @Get('/:id')
    async getExamen(@Res() res, @Param('id') examenID, @Query('activo') activo) {
        const examen = await this.examenesService.getExamen(examenID, activo);
        res.status(HttpStatus.OK).json({
            message: 'Examen obtenido correctamente',
            examen
        });        
    }

    // Examen por DNI
    @Get('/dni/:dni')
    async getExamenDNI(@Res() res, @Param('dni') dni) {
        const examen = await this.examenesService.getExamenDni(dni);
        res.status(HttpStatus.OK).json({
            message: 'Examen obtenido correctamente',
            examen
        });        
    }

    // Examen por Persona
    @Get('/persona/:persona')
    async getExamenPersona(@Res() res, @Param('persona') persona) {
        const examen = await this.examenesService.getExamenPersona(persona);
        res.status(HttpStatus.OK).json({
            message: 'Examen obtenido correctamente',
            examen
        });        
    }
    
    // Listar examens
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarExamenes(@Res() res, @Query() querys) {
        const examenes = await this.examenesService.listarExamenes(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de examenes correcto',
            examenes
        });            
    }

    // Crear examen
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async crearExamen(@Res() res, @Body() examenDTO: ExamenDTO ) {
        
        // Se verifica si ya hay un examen creado para esa persona
        const examenDB = await this.examenesService.getExamenPersona(examenDTO.persona);
        if(examenDB) throw new NotFoundException('Ya existe un examen creado para esta persona');
        
        // Se crea el examen
        const examen = await this.examenesService.crearExamen(examenDTO);  

        res.status(HttpStatus.OK).json({
            message: 'Examen creado correctamente',
            examen
        });      
        
    }

    // Actualizar examen
    @Put('/:id')
    async actualizarExamen(@Res() res, @Body() examenUpdateDTO: any, @Param('id') examenID ) {
        
        let examenDTO;

        const { activo } = examenUpdateDTO;
        
        if(activo === false) examenDTO = await this.examenesService.finalizarExamen(examenID, examenUpdateDTO);
        else examenDTO = examenUpdateDTO;  
        
        const examen = await this.examenesService.actualizarExamen(examenID, examenDTO);
        
        res.status(HttpStatus.OK).json({
            message: 'Examen actualizado correctamente',
            examen
        });      
    
    
    }

    // Eliminar examen
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async eliminarExamen(@Res() res, @Param('id') examenID) {
        const examen = await this.examenesService.eliminarExamen(examenID)
        res.status(HttpStatus.OK).json({
            message: 'Examen eliminado correctamente'
        }); 
    }

}
