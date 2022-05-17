import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AppController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(req: any): Promise<{
        token: string;
    }>;
    profile(req: any): Promise<{
        usuario: any;
        token: string;
    }>;
}
