import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormularioPracticaUpdateDTO } from './dto/formulario-practica-update.dto';
import { FormularioPracticaDTO } from './dto/formulario-practica.dto';
import { IFormularioPractica } from './interface/formulario-practica.interface';

@Injectable()
export class FormularioPracticaService {

    constructor(
        @InjectModel('Formulario-practica') private readonly formularioPracticaModel: Model<IFormularioPractica>,
    ){}

    // Formulario por ID
    async getFormulario(id: string): Promise<IFormularioPractica> {
        const formularioPractica = await this.formularioPracticaModel.findById(id);
        if(!formularioPractica) throw new NotFoundException('El formulario no existe');
        return formularioPractica;
    }  
    
    // Listar formularios
    async listarFormularios(querys: any): Promise<IFormularioPractica[]> {
        
        const {columna, direccion} = querys;

        // Ordenar
        let ordenar = [columna || 'createdAt', direccion || -1];
        
        const formularios = await this.formularioPracticaModel.find()
                                                              .sort([ordenar]);
        return formularios;
    }  

    // Crear formulario
    async crearFormulario(formularioPracticaDTO: FormularioPracticaDTO): Promise<IFormularioPractica> { 
        const data = {...formularioPracticaDTO, nro_formulario: '002'};
        console.log(data);       
        const formulario = new this.formularioPracticaModel(data);
        return await formulario.save();
    }

    // Actualizar formulario
    async actualizarFormulario(id: string, formularioPracticaUpdateDTO: FormularioPracticaUpdateDTO): Promise<IFormularioPractica> {        
        const formulario = await this.formularioPracticaModel.findByIdAndUpdate(id, formularioPracticaUpdateDTO, {new: true});
        return formulario;
    }

}
