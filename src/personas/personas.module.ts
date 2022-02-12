import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { personaSchema } from './schema/personas.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Persona', schema: personaSchema }])],
  providers: [PersonasService],
  controllers: [PersonasController]
})
export class PersonasModule {}
