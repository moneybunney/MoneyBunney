import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './interfaces/users.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUsersDto: CreateUsersDto){
        console.log('Received user:');
        console.log(createUsersDto);
        this.usersService.create(createUsersDto);
    }

    @Get()
    getAllUsers(): Promise<Users[]> {
        console.log('GET to /users | getAllUsers');
        return this.usersService.findAll();
    }

    @Get(':id')
    getUsers(@Param('id') id: string): Promise<Users> {
        console.log('GET to /users | getUsers');
        return this.usersService.findById(id);
    }
}