import { Controller, Get, Post, Body, Param, UsePipes } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe'
import { PATH_METADATA } from '@nestjs/common/constants';

@Controller('transactions')
export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    console.log('Transaction received:');
    console.log(CreateTransactionDto);
    this.transactionsService.create(createTransactionDto);
  }

  @Get()
  getAllTransactions(): Promise<Transactions[]> {
    var temp = new Date();
    console.log(temp);
    console.log(`GET to /transactions | getAllTransactions`);
    return this.transactionsService.findAll();
  }

  @Get('/income')
  getIncome(): Promise<Transactions[]>{
  	console.log(`GET to /transactions | getIncome`);
  	return this.transactionsService.findIncome();
  }

   @Get('/expenses')
  getExpenses(): Promise<Transactions[]>{
  	console.log(`GET to /transactions | getTransactions`);
  	return this.transactionsService.findExpenses();
  }

  @Get('/latest/:number')
  getLatest(@Param('number') number: number): Promise<Transactions[]>{
    console.log('GET to /transactions | getLatest');
    return this.transactionsService.findLatest(number);
  }

  @Get(':id')
  getTransaction(@Param('id') id: string): Promise<Transactions> {
    console.log('GET to /transactions | getTransaction');
    return this.transactionsService.findById(id);
  }

  @Get('(:subpage/)?(account/:account)(/latest/:number)?')
  getAccountTransactions(@Param('account') account: string, @Param('subpage') subpage : string, @Param('number') number: number)
  : Promise<Transactions[]>{
    console.log(subpage);
  	console.log(`GET to /transactions/account | getAccountTransactions`);
  	return this.transactionsService.findByAccount(account, subpage, number);
  }

}
