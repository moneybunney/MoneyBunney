import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Res,
  UsePipes,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TransactionsService } from './service/transactions.service';
import { TransactionDTO } from './dto/transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response } from 'express';
import { QueryDTO } from './dto/query.dto';
import { TransactionQueryService } from './service/transaction-query.service';

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
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  public async deleteTransaction(
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    this.logger.log('Delete to /transactions | deleteTransaction');
    await this.transactionsService.remove(id);
    return res.status(HttpStatus.OK).send();
  }

  @Get('/id')
  @ApiOperation({ title: 'Find transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction found.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  public async getTransaction(@Query('id') id: string, @Res() res: Response) {
    this.logger.log('Get to /transactions | getTransaction');
    const transactions: Transactions = await this.transactionsService.findById(
      id,
    );
    return res.status(HttpStatus.OK).send(transactions);
  }

  /**
 * Example request:
 {
  "selectors": [
    { "SelectorName": "any" }
  ]
 }
 */
  @Get('/query')
  @ApiOperation({ title: 'Find transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction response' })
  @ApiResponse({ status: 500, description: 'Validation error' })
  public async getTransactionByQuery(@Body() query: QueryDTO, @Res() res: Response) {
    this.logger.log('Get to /api/transactions/query');
    const transactions = await this.queryService.query(query);
    return res.status(HttpStatus.OK).send(transactions);
  }

  @Get()
  @ApiOperation({ title: 'Find all transactions'})
  @ApiResponse({ status: 200, description: 'Transactions found.' })
  @ApiResponse({ status: 404, description: 'No transactions found.' })
  getAllTransactions(): Promise<Transactions[]> {
    return this.transactionsService.findAll();
  }

  @Get('/income')
  @ApiOperation({ title: 'Find all income' })
  @ApiResponse({ status: 200, description: 'Transactions found.' })
  @ApiResponse({ status: 404, description: 'No transactions found.' })
  getIncome(): Promise<Transactions[]> {
    return this.transactionsService.findIncome();
  }

  @Get('/expenses')
  @ApiOperation({ title: 'Find all expenses' })
  @ApiResponse({ status: 200, description: 'Transactions found.' })
  getExpenses(): Promise<Transactions[]> {
    return this.transactionsService.findExpenses();
  }

  @Get('/account')
  @ApiOperation({ title: 'Find all account transactions' })
  @ApiResponse({ status: 200, description: 'Transactions found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'No transactions found.' })
  public async getAccountTransactions(
    @Query('account') account: string,
    @Query('date') date: string,
    @Query('number') number: number,
    @Res() res: Response,
  ) {
    this.logger.log('Get to /transactions | getAccountTransactions');
    const transactions: Transactions[] = await this.transactionsService.findAccountTransactions(
      account,
      date,
      number,
    );
    return res.status(HttpStatus.OK).send(transactions);
  }

  @Get('/account/expenses')
  @ApiOperation({ title: 'Find all account expenses' })
  @ApiResponse({ status: 200, description: 'Expenses found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'No expenses found.' })
  public async getAccountExpenses(
    @Query('account') account: string,
    @Query('date') date: string,
    @Query('number') number: number,
    @Res() res: Response,
  ) {
    this.logger.log('Get to /transactions | getAccountExpenses');
    const expenses: Transactions[] = await this.transactionsService.findAccountExpenses(
      account,
      date,
      number,
    );
    return res.status(HttpStatus.OK).send(expenses);
  }

  @Get('/account/income')
  @ApiOperation({ title: 'Find all account income' })
  @ApiResponse({ status: 200, description: 'Income found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'No income found.' })
  public async getAccountIncome(
    @Query('account') account: string,
    @Query('date') date: string,
    @Query('number') number: number,
    @Res() res: Response,
  ) {
    this.logger.log('Get to /transactions | getAccountIncome');
    const income: Transactions[] = await this.transactionsService.findAccountIncome(
      account,
      date,
      number,
    );
    return res.status(HttpStatus.OK).send(income);
  }
}
