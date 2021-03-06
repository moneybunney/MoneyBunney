import { Selector } from './selectors/selector';
import { AnySelector } from './selectors/any.selector';
import { IdSelector } from './selectors/id.selector';
import { Document } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { SortSelector } from './selectors/sort.selector';
import { WhereSelector } from './selectors/where.selector';
import { LimitSelector } from './selectors/limit.selector';

export class SelectorFactory<T extends Document> {
  constructor() {
    const usedSelectors = [
      () => new AnySelector<T>(),
      () => new IdSelector<T>(),
      () => new SortSelector<T>(),
      () => new WhereSelector<T>(),
      () => new LimitSelector<T>(),
    ];

    usedSelectors.forEach(s => this.addSelector(s));
  }

  private addSelector(constructor: () => Selector<T>) {
    const exampleVal = constructor();
    this.constructors[exampleVal.GetName()] = constructor;
  }

  constructors: SelectorConstructorMap<T> = {};
  CreateSelector = (name: string): Selector<T> => {
    if (this.constructors[name] === undefined) {
      throw new BadRequestException(
        'Selector with name: ' + name + ' was not recognized!',
      );
    } else {
      return this.constructors[name]();
    }
  };
}

interface SelectorConstructorMap<T extends Document> {
  [name: string]: () => Selector<T>;
}
