import * as mongoose from 'mongoose';

export const TransactionsSchema = new mongoose.Schema({
  Date,
  Account: String,
  Category: String,
  Price: Number,
  Description: String,
  Tags: [String],
});
