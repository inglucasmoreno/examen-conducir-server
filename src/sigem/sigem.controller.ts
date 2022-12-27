import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SigemService } from './sigem.service';

@Controller('sigem')
export class SigemController {

    constructor(private sigemService: SigemService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/token')
    async insert(@Res() res) {
      const respuesta = await this.sigemService.autenticacion();
      res.status(HttpStatus.OK).json({
        respuesta
      });
    }
  
    // @UseGuards(JwtAuthGuard)
    @Post('/getPersona')
    async getPersona(@Res() res, @Body() data: any) {
      console.log(data);
      const { persona, success } = await this.sigemService.getPersona(data);
      res.status(HttpStatus.OK).json({
        persona,
        success
      });
    }

}
