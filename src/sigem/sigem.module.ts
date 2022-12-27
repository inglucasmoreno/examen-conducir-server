import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { personaSchema } from 'src/personas/schema/personas.schema';
import { SigemController } from './sigem.controller';
import { SigemService } from './sigem.service';

@Module({
  imports: [
		MongooseModule.forFeature([
			{ name: 'Personas', schema: personaSchema },
		])
	],
  controllers: [SigemController],
  providers: [SigemService]
})
export class SigemModule {}
