import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RoleGuard } from "./role/role.guard";
import { Roles } from "./roles/roles.decorator";
import { RegisterDto } from "./dto/register.dto";

@Controller("users")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("authenticate")
    async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            const response = await this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json({ ...response });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }

    @Post("register")
    async register(@Res() res, @Body() registerDto: RegisterDto) {
        try {
            const response = await this.authService.registerUser(registerDto);
            return res.status(HttpStatus.CREATED).json({ response });
        } catch (error) {
            return res.status(error.status).json({ message: error.message });
        }
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json({ message: "Admin have access this resource" });
    }
}
