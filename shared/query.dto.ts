import { SelectorDTO } from "./selector.dto";

export class QueryDTO {
  readonly selectors: SelectorDTO[] = [];
  readonly aggregator: string = "";
}
