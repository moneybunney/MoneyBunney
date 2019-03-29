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
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response } from 'express';

@Controller('api/transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create Transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction successfully received.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
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
  @ApiResponse({ status: 500, description: 'Server error.'})
  public async deleteTransaction(
    @Query('id') id: string,
    @Res() res: Response,
  ) {
    this.logger.log('Delete to /transactions | deleteTransaction');
    await this.transactionsService.remove(id);
    return res.status(HttpStatus.OK).send();
  }

  @Delete('/purge')
  @ApiOperation({ title: 'Remove transaction from database' })
  @ApiResponse({ status: 200, description: 'All Transactions removed.'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  public async deleteAllTransaction(@Res() res: Response) {
    await this.transactionsService.removeAll();
    return res.status(HttpStatus.OK).send('All transactions purged!');
  }

  @Get('/id')
  @ApiOperation({ title: 'Find transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction found.' })
  @ApiResponse({ status: 500, description: 'Server error.'})
  public async getTransaction(@Query('id') id: string, @Res() res: Response) {
    this.logger.log('Get to /transactions | getTransaction');
    const transactions: Transactions = await this.transactionsService.findById(
      id,
    );
    return res.status(HttpStatus.OK).send(transactions);
  }

  @Get()
  @ApiOperation({ title: 'Find all transactions' })
  @ApiResponse({ status: 200, description: 'Transactions found.' })
  @ApiResponse({ status: 500, description: 'Server error.'})
  getAllTransactions(): Promise<Transactions[]> {
    return this.transactionsService.findAll();
  }

  @Get('/list')
  @ApiOperation({ title: 'Find a requested number of transactions starting from the given date' })
  @ApiResponse({ status: 200, description: 'Transactions  response'})
  @ApiResponse({ status: 500, description: 'Server error.'})
  getTransactions(
    @Query('date') date: string,
    @Query('number') amount: number,
  ): Promise<Transactions[]> {
    return this.transactionsService.findTransactions(date, amount);
  }
}
