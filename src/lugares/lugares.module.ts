import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usuarioSchema } from 'src/usuarios/schema/usuarios.schema';
import { LugaresController } from './lugares.controller';
import { LugaresService } from './lugares.service';
import { lugarSchema } from './schema/lugares.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Lugar', schema: lugarSchema}]),
        MongooseModule.forFeature([{name: 'Usuario', schema: usuarioSchema}]),
    ],
    controllers: [LugaresController],
    providers: [LugaresService],
    exports: [LugaresService]
})
export class LugaresModule {}
