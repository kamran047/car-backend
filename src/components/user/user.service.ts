import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { GenericResponseDto } from 'src/dtos/response/generic.reponse.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { sequelize } from '../utils/sequelize.connection.instance';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    private userRepository;
    constructor(
        private authService: AuthService,
    ) {
        this.userRepository = sequelize.getRepository(User);
    }

    async createUser(body) {
        const saltRounds = 10;
        body.password = await bcrypt.hash(body.password, saltRounds)
        let res = await this.userRepository.findOne({
            where: { email: body.email },
        });
        if (res) {
            return new GenericResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, 'Email already registered');
        }
        const result = await this.userRepository.create(
            body
        );
        if (!result) {
            return new GenericResponseDto(HttpStatus.INTERNAL_SERVER_ERROR, 'Unable to create user');
        }
        return new GenericResponseDto(
            HttpStatus.CREATED,
            'User Created Successfully',
            result,
        );
    }

    async login(body: any) {
        return await this.authService.genericLogin(body)
    }

}
