import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { GenericResponseDto } from "src/dtos/response/generic.reponse.dto";
import { User } from "src/entities/user.entity";
import { sequelize } from "../utils/sequelize.connection.instance";
import { JwtToken } from "./jwt.token";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
    ) { }

    async getUserByUserId(userId: number): Promise<User> {
        const userReposistory = sequelize.getRepository(User)
        const result = await userReposistory.findOne({ where: { id: userId } })
        if (!result) {
            throw new NotFoundException("User Not Found")
        }
        return result
    }

    async getUser(body: any): Promise<User> {
        const userReposistory = sequelize.getRepository(User)
        const result = await userReposistory.findOne({ where: { email: body.email } })
        if (!result) {
            throw new NotFoundException("User doesnot exist")
        }
        let isAuthenticated = await bcrypt.compare(body.password, result.password)
        if (!isAuthenticated) {
            throw new NotFoundException("Incorrect email or password")
        }
        return result
    }

    createToken(data: JwtToken): string {
        return this.jwtService.sign(data);
    }

    async genericLogin(body: any) {
        let user = await this.getUser(body)
        const tokenObj = new JwtToken(user.id)
        const token: string = this.createToken(tokenObj.toJSON())
        return new GenericResponseDto(HttpStatus.OK, "success", {
            user: user,
            token: token,
            expiry: 432000
        })
    }
}