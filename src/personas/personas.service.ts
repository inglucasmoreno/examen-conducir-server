import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IPersona } from './interface/personas.interface';
import { PersonaDTO } from './dto/personas.dto';
import { PersonaUpdateDTO } from './dto/personas-update.dto';

@Injectable()
export class PersonasService {

    constructor(@InjectModel('Persona') private readonly personaModel: Model<IPersona>) { }

    // Persona por ID
    async getPersona(id: string): Promise<IPersona> {

        const pipeline = [];

        const idPersona = new mongoose.Types.ObjectId(id);

        pipeline.push({ $match: { _id: idPersona } });

        // Join
        pipeline.push(
            {
                $lookup: { // Lookup - Usuario creador
                    from: 'usuarios',
                    localField: 'userCreator',
                    foreignField: '_id',
                    as: 'userCreator'
                }
            },
        );
        pipeline.push({ $unwind: '$userCreator' });

        // Join
        pipeline.push(
            {
                $lookup: { // Lookup - Usuario editor
                    from: 'usuarios',
                    localField: 'userUpdator',
                    foreignField: '_id',
                    as: 'userUpdator'
                }
            },
        );
        pipeline.push({ $unwind: '$userUpdator' });

        const persona = await this.personaModel.aggregate(pipeline);

        if (!persona) throw new NotFoundException('La persona no existe');
        return persona[0];

    }

    // Persona por DNI
    async getPersonaDNI(dni: string): Promise<IPersona> {
        const persona = await this.personaModel.findOne({ dni });
        return persona;
    }

    // Listar personas
    async listarPersonas(querys: any): Promise<any> {

        const {
            columna,
            direccion,
            desde,
            registerpp,
            activo,
            parametro,
        } = querys;

        // Filtrado
        let pipeline = [];
        let pipelineTotal = [];

        pipeline.push({ $match: {} });
        pipelineTotal.push({ $match: {} });

        // Activo / Inactivo
        let filtroActivo = {};
        if (activo && activo !== '') {
            filtroActivo = { activo: activo === 'true' ? true : false };
            pipeline.push({ $match: filtroActivo });
            pipelineTotal.push({ $match: filtroActivo });
        }

        // Filtro por parametros
        if (parametro && parametro !== '') {

            const porPartes = parametro.split(' ');
            let parametroFinal = '';

            for (var i = 0; i < porPartes.length; i++) {
                if (i > 0) parametroFinal = parametroFinal + porPartes[i] + '.*';
                else parametroFinal = porPartes[i] + '.*';
            }

            const regex = new RegExp(parametroFinal, 'i');
            pipeline.push({ $match: { $or: [{ apellido: regex }, { nombre: regex }, { dni: regex } ] } });
            pipelineTotal.push({ $match: { $or: [{ apellido: regex }, { nombre: regex }, { dni: regex } ] } });

        }

        // Ordenando datos
        const ordenar: any = {};
        if (columna) {
            ordenar[String(columna)] = Number(direccion);
            pipeline.push({ $sort: ordenar });
        }

        // Paginacion
        pipeline.push({ $skip: Number(desde) }, { $limit: Number(registerpp) });

        const [personas, personasTotal] = await Promise.all([
            this.personaModel.aggregate(pipeline),
            this.personaModel.aggregate(pipelineTotal),
        ]);

        return {
            personas,
            totalItems: personasTotal.length
        }
    }

    // Crear persona
    async crearPersona(personaDTO: PersonaDTO): Promise<IPersona> {

        const { dni } = personaDTO;

        // Se verifica si el DNI esta registrado
        let personaDB = await this.getPersonaDNI(dni);
        if (personaDB) throw new NotFoundException('El DNI ya esta registrado');

        const persona = new this.personaModel(personaDTO);
        return await persona.save();
    }

    // Actualizar persona
    async actualizarPersona(id: string, personaUpdateDTO: PersonaUpdateDTO): Promise<IPersona> {

        const { dni } = personaUpdateDTO;

        // Se verifica si la persona a actualizar existe
        let personaDB = await this.getPersona(id);
        if (!personaDB) throw new NotFoundException('La persona no existe');

        // Se verifica si el DNI ya esta cargado (En caso de que sea necesario)
        if (dni && dni !== personaDB.dni) {
            personaDB = await this.getPersonaDNI(dni);
            if (personaDB) throw new NotFoundException('El DNI ya esta registrado');
        }

        const persona = await this.personaModel.findByIdAndUpdate(id, personaUpdateDTO, { new: true });
        return persona;

    }

}
