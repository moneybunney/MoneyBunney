import * as mongoose from 'mongoose';

export const TransactionsSchema = new mongoose.Schema({
  Date,
  Account: String,
  Category: Object,
  Amount: Number,
  Description: String,
  Tags: [String],
});
