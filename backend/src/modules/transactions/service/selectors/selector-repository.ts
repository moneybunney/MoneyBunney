import { Selector } from './selector';
import { AnySelector } from './any.selector';
import { IdSelector } from './id.selector';
import { AppError } from 'src/common/error/AppError';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { SortSelector } from './sort.selector';

export class SelectorFactory<T extends Document> {

    constructor() {
        const usedSelectors = [
            () => new AnySelector<T>(),
            () => new IdSelector<T>(),
            () => new SortSelector<T>(),
        ];

        usedSelectors.forEach((s) => this.addSelector(s));
    }

    private addSelector(constructor: () => Selector<T>) {
        const exampleVal = constructor();
        this.constructors[exampleVal.getName()] = constructor;
    }

    constructors: SelectorConstructorMap<T> = {};
    CreateSelector = (name: string): Selector<T> => {
        if (this.constructors[name] === undefined) {
            throw new AppError(AppErrorTypeEnum.INVALID_SELECTOR_NAME,
                'Selector with name: ' + name + ' was not recognized!');
        } else {
            return this.constructors[name]();
        }
    }
}

interface SelectorConstructorMap<T extends Document> {
    [name: string]: () => Selector<T>;
}
