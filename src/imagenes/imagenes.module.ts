import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagenesController } from './imagenes.controller';
import { ImagenesService } from './imagenes.service';
import { imagenSchema } from 'src/imagenes/schema/imagenes.schema';
import { preguntaSchema } from 'src/preguntas/schema/preguntas.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Imagen', schema: imagenSchema }]),
    MongooseModule.forFeature([{ name: 'Pregunta', schema: preguntaSchema }]),
  ],
  controllers: [ImagenesController],
  providers: [ImagenesService]
})
export class ImagenesModule {}
