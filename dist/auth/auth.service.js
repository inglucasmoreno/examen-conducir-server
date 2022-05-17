"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const bcryptjs = require("bcryptjs");
const lugares_service_1 = require("../lugares/lugares.service");
let AuthService = class AuthService {
    constructor(usuarioService, lugaresService, jwtService, logger) {
        this.usuarioService = usuarioService;
        this.lugaresService = lugaresService;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async validateUser(username, pass) {
        const user = await this.usuarioService.getUsuarioPorNombre(username);
        if (!user)
            throw new common_1.NotFoundException('Datos incorrectos');
        const validPassword = bcryptjs.compareSync(pass, user.password);
        if (user && validPassword) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        throw new common_1.NotFoundException('Datos incorrectos');
    }
    async login(user) {
        this.logger.error('Probando Winston');
        const lugar_descripcion = await this.lugaresService.getLugar(user._doc.lugar);
        const payload = {
            userId: String(user._doc._id),
            usuario: user._doc.usuario,
            apellido: user._doc.apellido,
            nombre: user._doc.nombre,
            lugar: String(user._doc.lugar),
            lugar_descripcion: lugar_descripcion.descripcion,
            permisos: user._doc.permisos,
            role: user._doc.role
        };
        return {
            token: this.jwtService.sign(payload)
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        lugares_service_1.LugaresService,
        jwt_1.JwtService,
        common_1.Logger])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map