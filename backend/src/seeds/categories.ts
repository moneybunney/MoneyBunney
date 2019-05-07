import { CategorySchema } from '../modules/transactions/schemas/category.schema';
import * as mongoose from 'mongoose';

const Category = mongoose.model('Category', CategorySchema);

mongoose.connect('mongodb://localhost:27017/moneybunney', {
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
    Icon: 'mdiCheckBoxOutlineBlank',
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
