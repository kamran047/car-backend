import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }
    @Public()
    @Post('signup')
    async createCategory(@Body() body: any) {
        return await this.userService.createUser(body)
    }

    @Public()
    @Post('login')
    async login(@Body() body: any) {
        return await this.userService.login(body)
    }
}
