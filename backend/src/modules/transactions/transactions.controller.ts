import { Controller, Get, Post, Body, Param, UsePipes } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe'

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

  @Get(':id')
  getTransaction(@Param('id') id: string): Promise<Transactions> {
    console.log('GET to /transactions | getTransaction');
    return this.transactionsService.findById(id);
  }

  @Get('/account/:account')
  getAccountTransactions(@Param('account') account: string): Promise<Transactions[]>{
  	console.log(`GET to /transactions | getAccountTransactions`);
  	return this.transactionsService.findByAccount(account);
  }
}
