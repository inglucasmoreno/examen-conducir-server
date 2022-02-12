import { Module } from '@nestjs/common';
import { ExamenesController } from './examenes.controller';
import { ExamenesService } from './examenes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { examenSchema } from './schema/examenes.schema';
import { preguntaSchema } from 'src/preguntas/schema/preguntas.schema';
import { estPreguntaSchema } from 'src/estadisticas/schema/est-preguntas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Examen', schema: examenSchema }, 
      { name: 'Pregunta', schema: preguntaSchema }, 
      { name: 'Est-preguntas', schema: estPreguntaSchema }
    ]),
  ],  
  controllers: [ExamenesController],
  providers: [ExamenesService]
})
export class ExamenesModule {}
