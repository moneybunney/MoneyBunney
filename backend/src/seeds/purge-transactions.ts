import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TransactionsSchema } from '../modules/transactions/schemas/transactions.schema';

const Transaction = mongoose.model('Transactions', TransactionsSchema);

const dotEnvData = dotenv.parse(fs.readFileSync('../.env'));
const config = { ...dotEnvData, ...process.env };

mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/moneybunney`, {
  useNewUrlParser: true,
});

Transaction.deleteMany({}, err => {
  // tslint:disable-next-line:no-console
  if (err) {
    console.log(err);
  }
  mongoose.disconnect();
});
