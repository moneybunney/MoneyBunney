import { Document } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { ListAggregator } from './aggregators/list.aggregator';
import { Aggregator } from './aggregators/aggregator';
import { SumAggregator } from './aggregators/sum.aggregator';
import { BalanceAggregator } from './aggregators/balance.aggregator';

export class AggregatorFactory {
  constructor() {
    const usedAggregators: Array<() => Aggregator> = [
      () => new ListAggregator(),
      () => new SumAggregator(),
      () => new BalanceAggregator(),
    ];

    usedAggregators.forEach(a => this.addAggregator(a));
  }

  private addAggregator(constructor: () => Aggregator) {
    const exampleVal = constructor();
    this.constructors[exampleVal.GetName()] = constructor;
  }

  constructors: AggregatorConstructorMap = {};
  CreateAggregator = (name: string): Aggregator => {
    if (this.constructors[name] === undefined) {
      console.log('Creating a list aggregator, because one was not specified');
      // tslint:disable-next-line:no-string-literal
      return this.constructors['list']();
    } else {
      return this.constructors[name]();
    }
  };
}

interface AggregatorConstructorMap {
  [name: string]: () => Aggregator;
}
