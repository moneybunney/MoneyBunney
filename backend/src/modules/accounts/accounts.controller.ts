import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Res,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { AccountsService } from './service/accounts.service';
import { AccountDTO } from './dto/account.dto';
import { Accounts } from './interfaces/accounts.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response } from 'express';
import { QueryDTO } from '../../../../shared/query.dto';
import { AccountQueryService } from './service/account-query.service';

@Controller('api/accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly queryService: AccountQueryService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create Account' })
  @ApiResponse({
    status: 201,
    description: 'Account successfully received.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe(this.logger))
  async create(@Body() createAccountDto: AccountDTO, @Res() res: Response) {
    this.logger.log('Account received:');
    this.accountsService.create(createAccountDto);
    return res.status(HttpStatus.CREATED).send();
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

  @Post('/query')
  @ApiOperation({ title: 'Find account by ID' })
  @ApiResponse({ status: 200, description: 'Account response' })
  @ApiResponse({ status: 500, description: 'Validation error' })
  public async getAccountByQuery(
    @Body() query: QueryDTO,
    @Res() res: Response,
  ) {
    this.logger.log('POST to /api/accounts/query');
    const accounts = await this.queryService.query(query);
    return res.status(HttpStatus.OK).send(accounts);
  }

  @Get('')
  @ApiOperation({
    title: 'Get all accounts',
  })
  @ApiResponse({ status: 200, description: 'Accounts  response' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getAccounts(@Query() query): Promise<Accounts[]> {
    return this.accountsService.findAccounts();
  }
}
