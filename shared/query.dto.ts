import { SelectorDTO } from "./selector.dto";
import { AggregatorDTO } from "./aggregator.dto";

export class QueryDTO {
  readonly selectors: SelectorDTO[] = [];
  readonly aggregator: AggregatorDTO = { Name: "list" };
}
