import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
import JWT from "jsonwebtoken";

export interface CreateUserPayload {
    email: string,
    firstName: string,
    lastName?: string,
    password: string
}

export interface GetUserTokenPayload {
    email: string,
    password: string
}

class UserService {

    private static generateHash(password: string, salt: string) {
        return createHmac('sha256', salt).update(password).digest('hex');
    }

    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hashedPassword = this.generateHash(password, salt);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt: salt,
                password: hashedPassword
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } });
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getUserByEmail(email);
        if (!user)
            throw new Error('User not found!')

        const userSalt = user.salt;
        const userHashedPassword = this.generateHash(password, userSalt);

        if (userHashedPassword !== user.password)
            throw new Error('Wrong password!');

        // Gen Token
        const token = JWT.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
        return token;
    }
}

export default UserService;