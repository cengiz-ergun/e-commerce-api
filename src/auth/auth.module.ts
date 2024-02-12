import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user-auth.schema";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
