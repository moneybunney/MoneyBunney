import { Controller, Get, Post, Delete, Body, Param, UsePipes, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('api/transactions')
export class TransactionsController {

  constructor(
    private readonly transactionsService: TransactionsService,
    ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    console.log('Transaction received:');
    console.log(CreateTransactionDto);
    this.transactionsService.create(createTransactionDto);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: string): Promise<any> {
    return this.transactionsService.remove(id);
  }

  @Get()
  getAllTransactions(): Promise<Transactions[]> {
    return this.transactionsService.findAll();
  }

  @Get('/income')
  getIncome(): Promise<Transactions[]> {
  	return this.transactionsService.findIncome();
  }

   @Get('/expenses')
  getExpenses(): Promise<Transactions[]> {
  	return this.transactionsService.findExpenses();
  }

  @Get('/one/:id')
  getTransaction(@Param('id') id: string): Promise<Transactions> {
    return this.transactionsService.findById(id);
  }

  @Get('/list')
  getTransactions(@Query('date') date: string, @Query('number') amount: number)
  : Promise<Transactions[]> {
    return this.transactionsService.findTransactions(date, amount);
  }

  @Get('account/:account/:date/:number?')
  getAccountTransactions(@Param('account') account: string, @Param('date') date: string, @Param('number') number: number)
  : Promise<Transactions[]> {
  	return this.transactionsService.findAccountTransactions(account, date, number);
  }

  @Get('/expenses/account/:account/:date/:number?')
  getAccountExpenses(@Param('account') account: string, @Param('date') date: string, @Param('number') number: number)
  : Promise<Transactions[]> {
    return this.transactionsService.findAccountExpenses(account, date, number);
  }

   @Get('/income/account/:account/:date/:number?')
  getAccountIncome(@Param('account') account: string, @Param('date') date: string, @Param('number') number: number)
  : Promise<Transactions[]> {
    return this.transactionsService.findAccountIncome(account, date, number);
  }

}
