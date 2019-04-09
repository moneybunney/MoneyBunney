import { Document } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { ListAggregator } from './aggregators/list.aggregator';
import { Aggregator } from './aggregators/aggregator';

export class AggregatorFactory {
  constructor() {
    const usedAggregators: Array<() => Aggregator> = [
      () => new ListAggregator(),
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
