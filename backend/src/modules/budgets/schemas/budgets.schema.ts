import * as mongoose from 'mongoose';

export const BudgetsSchema = new mongoose.Schema({
  Category: String,
  StartDate: Date,
  EndDate: Date,
  Amount: Number,
  UserId: String,
});
