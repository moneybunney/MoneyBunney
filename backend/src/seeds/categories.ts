import { CategorySchema } from '../modules/transactions/schemas/category.schema';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const Category = mongoose.model('Category', CategorySchema);

const dotEnvData = dotenv.parse(fs.readFileSync('../.env'));
const config = { ...dotEnvData, ...process.env };

mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/moneybunney`, {
  useNewUrlParser: true,
});

const categories = [
  new Category({
    Name: 'Transport',
    Icon: 'mdiCar',
  }),
  new Category({
    Name: 'Food',
    Icon: 'mdiFood',
  }),
  new Category({
    Name: 'Entertainment',
    Icon: 'mdiGamepadVariant',
  }),
  new Category({
    Name: 'Health',
    Icon: 'mdiHospitalBuilding',
  }),
  new Category({
    Name: 'Gifts',
    Icon: 'mdiGift',
  }),
  new Category({
    Name: 'Bills',
    Icon: 'mdiClipboardText',
  }),
  new Category({
    Name: 'Travel',
    Icon: 'mdiWalletTravel',
  }),
  new Category({
    Name: 'Clothes',
    Icon: 'mdiHanger',
  }),
  new Category({
    Name: 'Personal care',
    Icon: 'mdiDumbbell',
  }),
  new Category({
    Name: 'Other',
    Icon: 'mdiBankTransfer',
  }),
];

Category.deleteMany({}, err => {
  // out with the old
  if (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
  }
  let done = 0;
  // in with the new
  categories.forEach(e => {
    e.save((saveErr, result) => {
      if (saveErr) {
        // tslint:disable-next-line: no-console
        console.log(saveErr);
      }
      done++;
      if (done === categories.length) {
        exit();
      }
    });
  });
});

function exit() {
  mongoose.disconnect();
}
