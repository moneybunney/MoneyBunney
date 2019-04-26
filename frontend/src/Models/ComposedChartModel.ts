import { IChart } from "./ChartModel";

export interface IComposedChart {
  key: string;
  positiveValues: IChart[];
  negativeValues: IChart[];
  lineValue: number;
}
