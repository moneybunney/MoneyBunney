import * as mongoose from 'mongoose';
import { CategorySchema } from './category.schema';

const Schema = mongoose.Schema;

export const TransactionsSchema = new mongoose.Schema({
  Date,
  Account: String,
  Category: { type: Schema.Types.ObjectId, ref: 'Category' },
  Amount: Number,
  Description: String,
  Tags: [String],
  UserId: String,
});

const Category = mongoose.model('Category', CategorySchema);
