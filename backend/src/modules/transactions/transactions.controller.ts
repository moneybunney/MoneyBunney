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
  Req,
} from '@nestjs/common';
import { TransactionsService } from './service/transactions.service';
import { CategoryService } from './service/category.service';
import { TransactionDTO } from './dto/transaction.dto';
import { Transactions } from './interfaces/transactions.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response, Request } from 'express';
import { QueryDTO } from '../../../../shared/query.dto';
import { TransactionQueryService } from './service/transaction.query.service';
import { UserService } from '../user/user.service';

@Controller('api/transactions')
export class TransactionsController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionsService: TransactionsService,
    private readonly categoryService: CategoryService,
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
    @Req() req: Request,
  ) {
    this.logger.log('Transaction received:');
    this.logger.log(createTransactionDto.Account);
    if ('Token' in req.cookies) {
      const category = await this.categoryService.find(
        createTransactionDto.Category,
      );
      if (category == null) {
        return res.status(400).send('Category not found!');
      }
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      this.transactionsService.create(createTransactionDto, userId);
      return res.status(HttpStatus.CREATED).send();
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
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
    @Req() req: Request,
  ) {
    this.logger.log('POST to /api/transactions/query');
    if ('Token' in req.cookies) {
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      query.selectors.push({
        Name: 'where',
        Key: 'UserId',
        Payload: { Relationship: 'eq', Value: userId },
      });
      const transactions = await this.queryService.query(query);
      return res.status(HttpStatus.OK).send(transactions);
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
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

  @Get('/tags')
  @ApiOperation({
    title: 'Get all tags',
  })
  @ApiResponse({ status: 200, description: 'List of all tags' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  public async getTags(@Res() res: Response, @Req() req: Request) {
    if ('Token' in req.cookies) {
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      const tags = await this.transactionsService.findAllTags(userId);
      return res.status(HttpStatus.OK).send(tags);
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
  }
}
