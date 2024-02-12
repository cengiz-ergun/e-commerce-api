import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtData } from "./interface/jwt-data";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user-auth.schema";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    async validate(payload): Promise<User> {
        const email = (payload as JwtData).email;
        const user = await this.userModel.findOne({ email });

        if (!user) throw new NotFoundException(`User with email ${email} not found`);

        return user;
    }
}
