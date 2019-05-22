import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Query,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDTO } from './dto/create.budget.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response, Request } from 'express';
import { UserService } from '../user/user.service';

@Controller('api/budgets')
export class BudgetsController {
  constructor(
    private readonly budgetsService: BudgetsService,
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create a Budget' })
  @ApiResponse({ status: 201, description: 'Budget successfully created.' })
  @ApiResponse({ status: 401, description: 'User not logged in' })
  public async create(
    @Body() createBudgetDTO: CreateBudgetDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.logger.log('Budget received:');
    this.logger.log(JSON.stringify(createBudgetDTO));
    if ('Token' in req.cookies) {
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      this.budgetsService.create(createBudgetDTO, userId);
      return res.status(HttpStatus.CREATED).send();
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
  }

  @Delete()
  @ApiOperation({ title: 'Remove a budget from database' })
  @ApiResponse({ status: 200, description: 'Budget succesfully deleted.' })
  @ApiResponse({ status: 400, description: 'Budget not found.' })
  public async deleteBudget(@Query('id') id: string, @Res() res: Response) {
    this.logger.log('Delete to /budgets | deleteBudget');
    await this.budgetsService.remove(id);
    return res.status(HttpStatus.OK).send();
  }

  @Get('')
  @ApiOperation({ title: 'Get all user budgets' })
  @ApiResponse({ status: 200, description: 'Successfully found budgets' })
  @ApiResponse({ status: 401, description: 'User not logged in' })
  public async getBudgets(@Req() req: Request, @Res() res: Response) {
    if ('Token' in req.cookies) {
      const userId = await this.userService.getIdByToken(req.cookies.Token);
      const budgets = await this.budgetsService.findBudgets(userId);
      return res.status(HttpStatus.OK).send(budgets);
    }
    return res.status(HttpStatus.UNAUTHORIZED).send();
  }
}
