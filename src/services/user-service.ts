import { prismaClient } from "../utils/database-util";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt-util"; // Pakai util yg sudah ada
import { toUserResponse } from "../models/user-model";

export class UserService {

    static async register(request: any) {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const countUser = await prismaClient.user.count({
            where: { email: registerRequest.email }
        });

        if (countUser !== 0) {
            throw new ResponseError(400, "Email already exists");
        }

        const password = await bcrypt.hash(registerRequest.password, 10);

        const user = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                email: registerRequest.email,
                password: password,
                role: "USER" 
            }
        });

        return toUserResponse(user.id, user.username, user.email, user.role);
    }

    static async login(request: any) {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: { email: loginRequest.email }
        });

        if (!user) {
            throw new ResponseError(401, "Username or password wrong");
        }

        console.log("=== DEBUG LOGIN ===");
        console.log("Input Password:", loginRequest.password);
        console.log("Email dari Android:", loginRequest.email);
        console.log("DB Password   :", user.password);
        

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password wrong");
        }

        return toUserResponse(user.id, user.username, user.email, user.role);
    }

    
}