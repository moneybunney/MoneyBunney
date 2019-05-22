import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Budget } from './interfaces/budget.interface';
import { CreateBudgetDTO } from './dto/create.budget.dto';
import { Transactions } from '../transactions/interfaces/transactions.interface';
import { Logger } from '../logger/logger.service';

interface IBudgetDTO {
  _id: string;
  Category: string;
  StartDate: string;
  EndDate: string;
  Amount: number;
  CurrentAmount: number;
}

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel('Budgets')
    private readonly budgetModel: Model<Budget>,
    @InjectModel('Transactions')
    private readonly transactionModel: Model<Transactions>,
    private readonly logger: Logger,
  ) {}

  async create(
    createBudgetDTO: CreateBudgetDTO,
    UserId: string,
  ): Promise<Budget> {
    const createdBudget = new this.budgetModel({
      ...createBudgetDTO,
      UserId,
    });
    return await createdBudget.save();
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.budgetModel
        .findById(id)
        .remove()
        .exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Requested budget was not found!');
    }
  }

  async findBudgets(UserId: string): Promise<IBudgetDTO[]> {
    const budgets = await this.budgetModel.find({ UserId }).exec();
    return Promise.all(
      budgets.map(async budget => {
        return {
          _id: budget._id,
          Category: budget.Category,
          StartDate: budget.StartDate,
          EndDate: budget.EndDate,
          Amount: budget.Amount,
          CurrentAmount: await this.findExpensesForBudget(budget),
        };
      }),
    );
  }

  async findExpensesForBudget(budget: Budget): Promise<number> {
    const result = await this.transactionModel
      .aggregate([
        {
          $match: {
            $and: [
              { UserId: budget.UserId },
              { Date: { $gte: budget.StartDate, $lte: budget.EndDate } },
              { Amount: { $lt: 0 } },
              { Category: budget.Category },
            ],
          },
        },
        { $group: { _id: null, amountSum: { $sum: '$Amount' } } },
      ])
      .exec();
    return 0 - (result.length > 0 ? result[0].amountSum : 0);
  }
}
