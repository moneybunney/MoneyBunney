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
    _id: '0',
  }),
  new Category({
    Name: 'Food',
    Icon: 'mdi/food',
    _id: '1',
  }),
  new Category({
    Name: 'Entertainment',
    Icon: 'mdi/gamepad-variant',
    _id: '2',
  }),
  new Category({
    Name: 'Health',
    Icon: 'mdi/hospital-building',
    _id: '3',
  }),
  new Category({
    Name: 'Gifts',
    Icon: 'mdi/gift',
    _id: '4',
  }),
  new Category({
    Name: 'Bills',
    Icon: 'mdi/clipboard-text',
    _id: '5',
  }),
  new Category({
    Name: 'Travel',
    Icon: 'mdi/wallet-travel',
    _id: '6',
  }),
  new Category({
    Name: 'Clothes',
    Icon: 'mdi/hanger',
    _id: '7',
  }),
  new Category({
    Name: 'Personal care',
    Icon: 'mdi/dumbbell',
    _id: '8',
  }),
  new Category({
    Name: 'Other',
    Icon: 'mdi/check-box-outline-blank',
    _id: '9',
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
