import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Res,
  Req,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './service/accounts.service';
import { AccountDTO } from './dto/account.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response, Request } from 'express';
import { UserService } from '../user/user.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create Account' })
  @ApiResponse({
    status: 201,
    description: 'Account successfully received.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe(this.logger))
  async create(
    @Body() createAccountDto: AccountDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    this.logger.log('Account received:');
    if ('Token' in req.cookies) {
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      this.accountsService.create(createAccountDto, userId);
      return res.status(HttpStatus.CREATED).send();
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
  }

  @Delete()
  @ApiOperation({ title: 'Remove account from database' })
  @ApiResponse({ status: 200, description: 'Account removed.' })
  @ApiResponse({ status: 200, description: 'Account not found.' })
  public async deleteAccount(@Query('id') id: string, @Res() res: Response) {
    this.logger.log('Delete to /accounts | deleteAccount');
    await this.accountsService.remove(id);
    return res.status(HttpStatus.OK).send();
  }

  @Get('')
  @ApiOperation({
    title: 'Get all accounts',
  })
  @ApiResponse({ status: 200, description: 'Accounts  response' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  public async getAccounts(@Res() res: Response, @Req() req: Request) {
    if ('Token' in req.cookies) {
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      const accounts = await this.accountsService.findAccounts(userId);
      return res.status(HttpStatus.OK).send(accounts);
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
  }
}
