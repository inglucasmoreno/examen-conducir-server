import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExamenDTO } from './dto/examenes.dto';
import { ExamenesService } from './examenes.service';
import { add } from 'date-fns';
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

    // Imprimir examen
    @UseGuards(JwtAuthGuard)
    @Post('/imprimir')
    async imprimirExamen(@Res() res, @Body() data: any) {
        await this.examenesService.imprimirExamen(data);
        res.status(HttpStatus.OK).json({
            message: 'Examen generado correctamente',
        });            
    }
    
    // Listar examenes - Historial
    @UseGuards(JwtAuthGuard)
    @Post('/historial/listado')
    async listarExamenesHistorial(@Res() res, @Query() querys, @Body() data) {
        const examenes = await this.examenesService.listarExamenesHistorial(querys, data);
        res.status(HttpStatus.OK).json({
            message: 'Listado de examenes para historial correcto',
            examenes
        });            
    }  

    // Listar examenes - Hoy
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarExamenes(@Res() res, @Query() querys) {
        const examenes = await this.examenesService.listarExamenes(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de examenes correcto',
            examenes
        });            
    }

    // Limpiar examenes antiguos
    @UseGuards(JwtAuthGuard)
    @Get('/limpiar/antiguos')
    async limpiarExamenes(@Res() res){ 
        const examenes = await this.examenesService.limpiarExamenes();
        res.status(HttpStatus.OK).json({
            message: 'Limpieza de examenes correcta',
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
     
        const { estado, tiempo, activo } = examenUpdateDTO;

        // Examen a estado -> "Rindiendo" | Se agrega fecha de inicio y finalizacion del examen
        if(estado === 'Rindiendo'){
            
            const fechaActual = new Date();
            
            const fechaFinalizacion = add(fechaActual, { minutes: Number(tiempo) });

            examenUpdateDTO.fecha_rindiendo = fechaActual;
            examenUpdateDTO.fecha_finalizacion = fechaFinalizacion;

        } 
        
        let examen;

        // Finalizar examen?
        if(activo === false){ 
            const data = await this.examenesService.finalizarExamen(examenID, examenUpdateDTO);
            examen = await this.examenesService.actualizarExamen(examenID, data); 
        }else{
            examen = await this.examenesService.actualizarExamen(examenID, examenUpdateDTO); 
        }   
                
        res.status(HttpStatus.OK).json({
            message: 'Examen actualizado correctamente',
            examen
        });      
    
    
    }

    // Listar reactivaciones
    @UseGuards(JwtAuthGuard)
    @Get('/reactivar/:id')
    async listarReactivaciones(@Res() res, @Query() querys, @Param('id') examenID) {
        const reactivaciones = await this.examenesService.listarReactivaciones(examenID, querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de reactivaciones correcta',
            reactivaciones
        });            
    }

    // Reactivar examen
    @Put('/reactivar/:id')
    async reactivarExamen(@Res() res, @Body() examenUpdateDTO: any, @Param('id') examenID ) {
        
        const examen = await this.examenesService.reactivarExamen(examenID, examenUpdateDTO);
        
        res.status(HttpStatus.OK).json({
            message: 'Examen reactivado correctamente',
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
