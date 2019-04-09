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
import { TransactionsService } from './service/transactions.service';
import { TransactionDTO } from './dto/transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response } from 'express';
import { QueryDTO } from '../../../../shared/query.dto';
import { TransactionQueryService } from './service/transaction.query.service';

@Controller('api/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly queryService: TransactionQueryService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create Transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction successfully received.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe(this.logger))
  async create(
    @Body() createTransactionDto: TransactionDTO,
    @Res() res: Response,
  ) {
    this.logger.log('Transaction received:');
    this.logger.log(createTransactionDto.Account);
    this.transactionsService.create(createTransactionDto);
    return res.status(HttpStatus.CREATED).send();
  }

  @Delete()
  @ApiOperation({ title: 'Remove transaction from database' })
  @ApiResponse({ status: 200, description: 'Transaction removed.' })
  @ApiResponse({ status: 200, description: 'Transaction not found.' })
  public async deleteTransaction(
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    this.logger.log('Delete to /transactions | deleteTransaction');
    await this.transactionsService.remove(id);
    return res.status(HttpStatus.OK).send();
  }

  @Post('/query')
  @ApiOperation({ title: 'Find transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction response' })
  @ApiResponse({ status: 500, description: 'Validation error' })
  public async getTransactionByQuery(
    @Body() query: QueryDTO,
    @Res() res: Response,
  ) {
    this.logger.log('POST to /api/transactions/query');
    const transactions = await this.queryService.query(query);
    return res.status(HttpStatus.OK).send(transactions);
  }

  @Get('/list')
  @ApiOperation({
    title:
      'Find a requested number of transactions starting from the given date',
  })
  @ApiResponse({ status: 200, description: 'Transactions  response' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getTransactions(
    @Query('date') date: string,
    @Query('number') amount: number,
  ): Promise<Transactions[]> {
    return this.transactionsService.findTransactions(date, amount);
  }
}
