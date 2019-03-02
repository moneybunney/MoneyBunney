import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        console.log('Received user:');
        console.log(createUserDto);
        this.userService.create(createUserDto);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        console.log('GET to /users | getAllUsers');
        return this.userService.findAll();
    }

    @Get(':id')
    getUser(@Param('id') id: string): Promise<User> {
        console.log('GET to /users | getUser');
        return this.userService.findById(id);
    }
}