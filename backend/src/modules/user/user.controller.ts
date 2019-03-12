import {Body, Controller, Get, HttpStatus, Post, Res, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dto/create-user.dto';
import { Response} from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /** Get all endpoint - authorization required */
    @Get('')
    @UseGuards(AuthGuard('bearer'))
    @ApiOperation({title: 'Get List of All Users'})
    //For this request an existing user should try to login first and then authorize with 'Bearer TOKEN',
    //where TOKEN - is the token recieved by logging in.
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User found.'})
    @ApiResponse({ status: 401, description: 'User not authorized for this request.'})
    @ApiResponse({ status: 404, description: 'No Users found.'})
    public async getAllUsers(@Res() res: Response) {
        console.log('Get to /user | getAllUsers');
        const users: User[] = await this.userService.findAll();
        return res
                .status(HttpStatus.OK)
                .send(users);
    }

    /** Create user endpoint */
    @Post('')
    @ApiOperation({title: 'Create User'})
    @ApiResponse({ status: 201, description: 'User created.'})
    @ApiResponse({ status: 422, description: 'User already exists.'})
    public async create(@Body() createUser: UserDTO, @Res() res : Response) {
        console.log('Received user object');
        console.log(createUser);
        await this.userService.createUser(createUser);
        return res.status(HttpStatus.CREATED).send();
    }

    /** Login endpoint returns a token */
    @Post('login')
    @ApiOperation({title: 'Authenticate'})
    @ApiResponse({ status: 200, description: 'Authentication successful.'})
    @ApiResponse({ status: 401, description: 'Wrong credentials.'})
    public async login(@Body() user: UserDTO, @Res() res: Response) {
        console.log('Trying to log in to: ' + user.email);
        const foundUser: User = await this.userService.authenticateUser(user);
        if(foundUser) {
            const token : string = await Buffer.from(JSON.stringify(user)).toString('base64');
            return res.status(HttpStatus.OK).cookie('Token', token.substring(0, token.length-1)).send();
        } else {
            throw new AppError(AppErrorTypeEnum.AUTHENTICATION_FAILED);
        }
    }

    /** Find by username endpoint */
    @Get(':username')
    @ApiOperation({title: 'Find by username'})
    @ApiResponse({ status: 200, description: 'User found.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    public async getByUsername(@Param('username')email: string, @Res() res: Response){
        console.log('GET to /user | getByUsername');
        const user: User = await this.userService.findByEmail(email);
        return res.status(HttpStatus.OK).send(user);
    }
}
