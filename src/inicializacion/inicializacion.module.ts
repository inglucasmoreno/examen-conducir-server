import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InicializacionController } from './inicializacion.controller';
import { InicializacionService } from './inicializacion.service';
import { preguntaSchema } from '../preguntas/schema/preguntas.schema';
import { usuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { lugarSchema } from 'src/lugares/schema/lugares.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:'Pregunta', schema: preguntaSchema}]),
    MongooseModule.forFeature([{name: 'Usuario', schema: usuarioSchema}]),
    MongooseModule.forFeature([{name: 'Lugar', schema: lugarSchema}])
  ],
  controllers: [InicializacionController],
  providers: [InicializacionService]
})
export class InicializacionModule {}
