import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreguntasController } from './preguntas.controller';
import { PreguntasService } from './preguntas.service';
import { preguntaSchema } from './schema/preguntas.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Pregunta', schema: preguntaSchema}])],
  controllers: [PreguntasController],
  providers: [PreguntasService]
})
export class PreguntasModule {}
