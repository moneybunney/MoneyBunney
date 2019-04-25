import * as mongoose from 'mongoose';

export const AccountsSchema = new mongoose.Schema(
  {
    Name: String,
    Type: String,
  },
  { versionKey: false },
);
