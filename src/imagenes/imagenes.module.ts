import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagenesController } from './imagenes.controller';
import { ImagenesService } from './imagenes.service';
import { imagenSchema } from 'src/imagenes/schema/imagenes.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Imagen', schema: imagenSchema }])],
  controllers: [ImagenesController],
  providers: [ImagenesService]
})
export class ImagenesModule {}
