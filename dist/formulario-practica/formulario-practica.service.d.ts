import { Model } from 'mongoose';
import { FormularioPracticaUpdateDTO } from './dto/formulario-practica-update.dto';
import { FormularioPracticaDTO } from './dto/formulario-practica.dto';
import { IFormularioPractica } from './interface/formulario-practica.interface';
import { IUsuario } from 'src/usuarios/interface/usuarios.interface';
export declare class FormularioPracticaService {
    private readonly formularioPracticaModel;
    private readonly usuarioModel;
    url_logo: string;
    url_template_auto: string;
    url_template_moto: string;
    url_destino_pdf_auto: string;
    url_destino_pdf_moto: string;
    constructor(formularioPracticaModel: Model<IFormularioPractica>, usuarioModel: Model<IUsuario>);
    getFormulario(id: string): Promise<IFormularioPractica>;
    listarFormularios(querys: any): Promise<any>;
    listarFormulariosPorLugar(id: string, querys: any): Promise<any>;
    limpiarFormularios(): Promise<IFormularioPractica[]>;
    imprimirFormulario(data: any): Promise<string>;
    crearFormulario(formularioPracticaDTO: FormularioPracticaDTO, querys: any): Promise<IFormularioPractica>;
    actualizarFormulario(id: string, formularioPracticaUpdateDTO: FormularioPracticaUpdateDTO): Promise<IFormularioPractica>;
}
