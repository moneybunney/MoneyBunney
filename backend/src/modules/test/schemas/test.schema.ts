import * as mongoose from 'mongoose';

export const TestSchema = new mongoose.Schema({
  StringVariable: String,
  IntVariable: Number,
  ObjectVariable: Object,
});
