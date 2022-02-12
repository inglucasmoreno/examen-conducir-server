import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, NotFoundException, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LugarUpdateDTO } from './dto/lugares-update.dto';
import { LugarDTO } from './dto/lugares.dto';
import { LugaresService } from './lugares.service';

@Controller('lugares')
export class LugaresController {

    constructor(private lugaresService: LugaresService){}

     // Lugar por ID
     @UseGuards(JwtAuthGuard)
     @Get('/:id')
     async getLugar(@Res() res, @Param('id') lugarID) {
         const lugar = await this.lugaresService.getLugar(lugarID); 
         res.status(HttpStatus.OK).json({
             message: 'Lugar obtenido correctamente',
             lugar
         });         
     }
     
     // Listar lugares
     @UseGuards(JwtAuthGuard)
     @Get('/')
     async listarLugares(@Res() res, @Query() querys) {
         const lugares = await this.lugaresService.listarLugares(querys);
         res.status(HttpStatus.OK).json({
             message: 'Los lugares se listaron correctamente',
             lugares
         });            
     }
 
     // Crear lugar
     @UseGuards(JwtAuthGuard)
     @Post('/')
     async crearLugares(@Res() res, @Body() lugarDTO: LugarDTO ) {
         const lugar = await this.lugaresService.crearLugar(lugarDTO);    
         res.status(HttpStatus.OK).json({
             message: 'Lugar creado correctamente',
             lugar
         });      
     }
 
     // Actualizar lugar
     @UseGuards(JwtAuthGuard)
     @Put('/:id')
     async actualizarLugar(@Res() res, @Body() lugarUpdateDTO: LugarUpdateDTO, @Param('id') lugarID ) {
        const lugar = await this.lugaresService.actualizarLugar(lugarID, lugarUpdateDTO);
        res.status(HttpStatus.OK).json({
            messsage: 'Lugar actualizado correctamente',
            lugar
        });      
     
    }

}
