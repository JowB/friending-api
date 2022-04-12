import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { CreateUserDto } from './dto/users.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post('auth/signup')
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
