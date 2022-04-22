import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonasModule } from './personas/personas.module';
import { LugaresModule } from './lugares/lugares.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { MongoModule } from './config/mongo.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { ExamenesModule } from './examenes/examenes.module';
import { InicializacionModule } from './inicializacion/inicializacion.module';
import { ImagenesModule } from './imagenes/imagenes.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SocketModule } from './socket/socket.module';
import { ConfigModule } from '@nestjs/config';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { FormularioPracticaModule } from './formulario-practica/formulario-practica.module';

@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'public'),
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      PersonasModule, 
      LugaresModule, 
      PreguntasModule, 
      UsuariosModule, 
      AuthModule,
      MongoModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '12h' }
      }),
      ExamenesModule,
      InicializacionModule,
      ImagenesModule,
      SocketModule,
      EstadisticasModule,
      FormularioPracticaModule, 
      ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
