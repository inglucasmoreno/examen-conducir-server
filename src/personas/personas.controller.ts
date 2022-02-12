import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { PersonaDTO } from './dto/personas.dto';
import { PersonasService } from './personas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PersonaUpdateDTO } from './dto/personas-update.dto';

@Controller('personas')
export class PersonasController {

    constructor(private personasService: PersonasService){}
    
    // Persona por ID
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getPersona(@Res() res, @Param('id') personaID) {
        const persona = await this.personasService.getPersona(personaID);
        res.status(HttpStatus.OK).json({
            message: 'Persona obtenida correctamente',
            persona
        });        
    }

    // Persona por DNI
    @UseGuards(JwtAuthGuard)
    @Get('/dni/:dni')
    async getPersonaDNI(@Res() res, @Param('dni') personaDNI) {
        const persona = await this.personasService.getPersonaDNI(personaDNI);
        res.status(HttpStatus.OK).json({
            message: 'Persona obtenida correctamente',
            persona
        });        
    }
    
    // Listar personas
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listarPersonas(@Res() res, @Query() querys) {
        const personas = await this.personasService.listarPersonas(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de personas correcto',
            personas
        });            
    }

    // Crear persona
    @UseGuards(JwtAuthGuard)
    @Post('/')
    async crearPersona(@Res() res, @Body() personaDTO: PersonaDTO ) {
        const persona = await this.personasService.crearPersona(personaDTO);    
        res.status(HttpStatus.OK).json({
            message: 'Persona creada correctamente',
            persona
        });      
    }

    // Actualizar persona
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async actualizarPersona(@Res() res, @Body() personaUpdateDTO: PersonaUpdateDTO, @Param('id') personaID ) {
        const persona = await this.personasService.actualizarPersona(personaID, personaUpdateDTO);
        res.status(HttpStatus.OK).json({
            message: 'Persona actualizada correctamente',
            persona
        });      
    
    }

}
