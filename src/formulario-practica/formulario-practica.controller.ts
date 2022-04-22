import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FormularioPracticaUpdateDTO } from './dto/formulario-practica-update.dto';
import { FormularioPracticaDTO } from './dto/formulario-practica.dto';
import { FormularioPracticaService } from './formulario-practica.service';

@Controller('formulario-practica')
export class FormularioPracticaController {
    
    constructor(private formularioPracticaService: FormularioPracticaService){}

    // Formulario por ID
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getFormulario(@Res() res, @Param('id') formularioID) {
        const formulario = await this.formularioPracticaService.getFormulario(formularioID); 
        res.status(HttpStatus.OK).json({
            message: 'Formulario obtenido correctamente',
            formulario
        });         
    }
    
    // Listar formularios
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarFormularios(@Res() res, @Query() querys) {
        const formularios = await this.formularioPracticaService.listarFormularios(querys);
        res.status(HttpStatus.OK).json({
            message: 'Los formularios se listaron correctamente',
            formularios
        });            
    }

    // Crear fomulario
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async crearFormulario(@Res() res, @Body() formularioPracticaDTO: FormularioPracticaDTO ) {
        const formulario = await this.formularioPracticaService.crearFormulario(formularioPracticaDTO);    
        res.status(HttpStatus.OK).json({
            message: 'Fomulario creado correctamente',
            formulario
        });      
    }

    // Actualizar formulario
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarFomulario(@Res() res, @Body() formularioPracticaUpdateDTO: FormularioPracticaUpdateDTO, @Param('id') formularioID ) {
       const formulario = await this.formularioPracticaService.actualizarFormulario(formularioID, formularioPracticaUpdateDTO);
       res.status(HttpStatus.OK).json({
           messsage: 'Formulario actualizado correctamente',
           formulario
       });      
    
   }

}
