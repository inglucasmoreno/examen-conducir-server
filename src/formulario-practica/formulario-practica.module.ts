import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormularioPracticaController } from './formulario-practica.controller';
import { FormularioPracticaService } from './formulario-practica.service';
import { formularioPracticaSchema } from './schema/formulario-practica.schema';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Formulario-practica', schema: formularioPracticaSchema}]), ],
  controllers: [FormularioPracticaController],
  providers: [FormularioPracticaService]
})
export class FormularioPracticaModule {}
