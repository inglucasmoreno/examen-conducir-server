"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const personas_schema_1 = require("../personas/schema/personas.schema");
const sigem_controller_1 = require("./sigem.controller");
const sigem_service_1 = require("./sigem.service");
let SigemModule = class SigemModule {
};
SigemModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Personas', schema: personas_schema_1.personaSchema },
            ])
        ],
        controllers: [sigem_controller_1.SigemController],
        providers: [sigem_service_1.SigemService]
    })
], SigemModule);
exports.SigemModule = SigemModule;
//# sourceMappingURL=sigem.module.js.map