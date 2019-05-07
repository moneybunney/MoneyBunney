import * as mongoose from 'mongoose';

export const AccountsSchema = new mongoose.Schema({
  Name: String,
  InitialBalance: Number,
  UserId: String,
});
