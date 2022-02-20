import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import * as XLSX from 'xlsx';
import { IPregunta } from 'src/preguntas/interface/preguntas.interface';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';
import { ILugar } from 'src/lugares/interface/lugares.interface';

@Injectable()
export class InicializacionService {
    
    constructor(
        @InjectModel('Pregunta') private readonly preguntasModel: Model<IPregunta>,
        @InjectModel('Usuario') private readonly usuarioModel: Model<IUsuario>,
        @InjectModel('Lugar') private readonly lugarModel: Model<ILugar>
        ){}

    async initPreguntas(): Promise<any> {

        // Verificacion
        const verificacion = await this.preguntasModel.find();
        if(verificacion.length != 0) throw new NotFoundException('Las preguntas ya fueron inicializadas');

        // Inicializacion de preguntas  
        const workbook = XLSX.readFile('./src/inicializacion/examen.xlsx');
        const workbookSheets = workbook.SheetNames;
        const sheet = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        
        const preguntas: any[] = dataExcel;

        preguntas.forEach( async pregunta => {
            const nuevaPregunta = new this.preguntasModel(pregunta);
            await nuevaPregunta.save();             
        });

    }

    async initUsuarios(): Promise<any> {
        
        // Verificacion
        const verificacion = await this.lugarModel.find();
        if(verificacion.length != 0) throw new NotFoundException('Los usuarios ya fueron inicializados');

        // 1) - Se crea lugar global
        const nuevoLugar = new this.lugarModel({ descripcion: 'DIRECCION DE TRANSPORTE' });
        const lugar = await nuevoLugar.save();

        // 2) - Se crea usuario administrador
        const data: any = {
            usuario: 'admin',
            apellido: 'Admin',
            nombre: 'Admin',
            dni: '34060399',
            lugar: lugar._id,
            permisos: [],
            email: 'admin@gmail.com',
            role: 'ADMIN_ROLE',
            activo: true
        }
    
        // Generacion de password encriptado
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync('admin', salt);
    
        // Se crea y se almacena en la base de datos al usuario administrador
        const usuario = new this.usuarioModel(data);
        await usuario.save();
    
    }

}
