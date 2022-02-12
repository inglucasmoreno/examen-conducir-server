import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';
import { estPreguntaSchema } from './schema/est-preguntas.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Est-preguntas', schema: estPreguntaSchema}])],  
  controllers: [EstadisticasController],
  providers: [EstadisticasService]
})
export class EstadisticasModule {}
