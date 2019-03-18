import {Body, Controller, Get, HttpStatus, Post, Res, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';
import { Response} from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AppError } from '../../common/error/AppError';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';
import { Logger } from '../logger/logger.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly logger: Logger) {}

    /** Get all endpoint - authorization required */
    @Get('')
    @UseGuards(AuthGuard('bearer'))
    @ApiOperation({title: 'Get List of All Users'})
    //For this request an existing user should try to login first and then authorize with 'Bearer TOKEN',
    //where TOKEN - is the token recieved by logging in.
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User found.'})
    @ApiResponse({ status: 401, description: 'User not authorized for this request.'})
    public async getAllUsers(@Res() res: Response) {
        this.logger.log('Get to /user | getAllUsers');
        const users: User[] = await this.userService.findAll();
        return res.status(HttpStatus.OK).send(users);
    }

    /** Create user endpoint */
    @Post('')
    @ApiOperation({title: 'Create User'})
    @ApiResponse({ status: 201, description: 'User created.'})
    @ApiResponse({ status: 409, description: 'User already exists.'})
    public async create(@Body() createUser: UserDTO, @Res() res : Response) {
        this.logger.log('Received user');
        this.logger.log(createUser.email);
        await this.userService.createUser(createUser);
        let token: string = await Buffer.from(JSON.stringify(createUser)).toString('base64');
        //made these checks, because token is encoded to url when setting cookie which messes with the padding symbol '='
        if(await token.slice(-2) === "=="){
            token = await token.substring(0, token.length - 2);
        } else if (await token.slice(-1) === "=") {
            token = await token.substring(0, token.length - 1);
        }
        return res.status(HttpStatus.CREATED).cookie('Token', token).send();
    }

    /** Login endpoint returns a token */
    @Post('login')
    @ApiOperation({title: 'Authenticate'})
    @ApiResponse({ status: 200, description: 'Authentication successful.'})
    @ApiResponse({ status: 401, description: 'Wrong credentials.'})
    public async login(@Body() user: UserDTO, @Res() res: Response) {
        this.logger.log('Trying to log in to: ' + user.email);
        const foundUser: User = await this.userService.authenticateUser(user);
        if(foundUser) {
            let token : string = await Buffer.from(JSON.stringify(user)).toString('base64');
        //made these checks, because token is encoded to url when setting cookie which messes with the padding symbol '='
            if(await token.slice(-2) === "==") {
                token = await token.substring(0, token.length - 2);
            } else if(await token.slice(-1) === "=") {
                token = await token.substring(0, token.length - 1);
            }
            return res.status(HttpStatus.OK).cookie('Token', token).send();
        } else {
            throw new AppError(AppErrorTypeEnum.AUTHENTICATION_FAILED);
        }
    }

    /** Find by email endpoint */
    @Get(':email')
    @ApiOperation({title: 'Find by email'})
    @ApiResponse({ status: 200, description: 'User found.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    public async getByEmail(@Param('email')email: string, @Res() res: Response){
        this.logger.log('GET to /user | getByEmail');
        const user: User = await this.userService.findByEmail(email);
        return res.status(HttpStatus.OK).send(user);
    }
}
