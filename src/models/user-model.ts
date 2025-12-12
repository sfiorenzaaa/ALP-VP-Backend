import { Role } from "@prisma/client";
import { generateToken } from "../utils/jwt-util"

export type UserResponse = {
    username: string;
    email: string;
    role: Role;
    token?: string
}

export type UserJWTPayload = {
    id: number;
    username: string;
    email: string;
    role: Role;
}

export interface RegisterUserRequest {
    username: string
    email: string
    password: string
}

export interface LoginUserRequest {
    email: string
    password: string
}

export function toUserResponse(
    id: number,
    username: string,
    email: string,
    role : Role,
): UserResponse {
    return {
                username: username,
                email: email,
                role: role,

                token: generateToken(
                    {
                        id: id,
                        username: username,
                        email: email,
                        role: role
                    },
                    "1h"
        ),
    }
}

