import * as mongoose from 'mongoose';

export const TransactionsSchema = new mongoose.Schema(
  {
    Date,
    Account: String,
    Category: String,
    Amount: Number,
    Description: String,
    Tags: [String],
  },
  { versionKey: false },
);
