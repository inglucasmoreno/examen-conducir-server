
export class UsuarioUpdateDTO {
    
    readonly usuario: string;
    
    readonly dni: string;
    
    readonly apellido: string;
   
    readonly nombre: string;
    
    password: string;
    
    readonly email: string;
    
    readonly role: string;

    permisos: string[];
    
    lugar: string;

    readonly activo: boolean;
    

}