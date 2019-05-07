import { CategorySchema } from '../modules/transactions/schemas/category.schema';
import * as mongoose from 'mongoose';

const Category = mongoose.model('Category', CategorySchema);

mongoose.connect('mongodb://localhost:27017/moneybunney', {
  useNewUrlParser: true,
});

const categories = [
  new Category({
    Name: 'Transport',
    Icon: 'mdi/car',
  }),
  new Category({
    Name: 'Food',
    Icon: 'mdi/food',
  }),
  new Category({
    Name: 'Entertainment',
    Icon: 'mdi/gamepad-variant',
  }),
  new Category({
    Name: 'Health',
    Icon: 'mdi/hospital-building',
  }),
  new Category({
    Name: 'Gifts',
    Icon: 'mdi/gift',
  }),
  new Category({
    Name: 'Bills',
    Icon: 'mdi/clipboard-text',
  }),
  new Category({
    Name: 'Travel',
    Icon: 'mdi/wallet-travel',
  }),
  new Category({
    Name: 'Clothes',
    Icon: 'mdi/hanger',
  }),
  new Category({
    Name: 'Personal care',
    Icon: 'mdi/dumbbell',
  }),
  new Category({
    Name: 'Other',
    Icon: 'mdi/check-box-outline-blank',
  }),
];

let done = 0;
for (let i = 0; i < categories.length; i++) {
  categories[i].save(function(err, result) {
    done++;
    if (done === categories.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
