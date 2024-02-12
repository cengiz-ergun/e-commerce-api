import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { Role } from "./enum/role";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user-auth.schema";
import { RegisterDto } from "./dto/register.dto";
import { JwtData } from "./interface/jwt-data";
import { userToJwtData } from "./converts/userToJwtData";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async authenticate(authenticateDto: AuthenticateDto): Promise<any> {
        const email = authenticateDto.email;
        const user = await this.userModel.findOne({ email });

        if (!user) throw new NotFoundException(`User with email ${email} not found`);

        const passwordMatch = await bcrypt.compare(authenticateDto.password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException("Invalid password");
        }

        const jwtData: JwtData = userToJwtData(user);

        const token = sign(jwtData, process.env.SECRET_KEY, { expiresIn: "1h" });

        return {
            token: token,
        };
    }

    async registerUser(registerDto: RegisterDto): Promise<any> {
        const email = registerDto.email;
        const registeredUser = await this.userModel.findOne({ email });

        if (registeredUser) throw new ConflictException(`User with email ${email} already registered`);

        const hash = await bcrypt.hash(registerDto.password, 10);
        const documentCount = await this.userModel.countDocuments({}).exec();
        const role = documentCount === 0 ? Role.Admin : Role.Customer;
        const user = await this.userModel.create({
            email: registerDto.email,
            password: hash,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            role: role,
        });
        return { id: user._id, email: user.email, role: user.role };
    }
}
