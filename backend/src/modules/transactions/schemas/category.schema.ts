import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  Name: String,
  Icon: String,
});
