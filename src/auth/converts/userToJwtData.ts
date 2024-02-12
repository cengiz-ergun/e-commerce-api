import { JwtData } from "../interface/jwt-data";
import { User } from "../schemas/user-auth.schema";

export function userToJwtData(user: User): JwtData {
    return {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
    };
}
