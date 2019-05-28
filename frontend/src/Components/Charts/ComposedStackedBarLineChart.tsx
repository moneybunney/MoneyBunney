import { CircularProgress, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { IComposedChart } from "../../Models/ComposedChartModel";

const NEGATIVECOLORS = ["#7C0A02", "#ED2939", "#B80F0A", "#960018", "#B22222"];

const POSITIVECOLORS = ["#006400", "#228B22", "#2E8B57", "#32CD32", "#20B2AA"];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: 110,
    marginTop: 110
  }
}));

interface IProps {
  data: IComposedChart[];
  loading: boolean;
  positiveLabel?: string;
  negativeLabel?: string;
  lineLabel?: string;
}

interface IMaxLengths {
  negative: number;
  positive: number;
}

const maxLengthIndex = (data: IComposedChart[]): IMaxLengths => {
  let maxNegativeLength = 0;
  let maxNegativeIndex = 0;
  let maxPositiveLength = 0;
  let maxPositiveIndex = 0;
  data.forEach((element, index) => {
    if (element.negativeValues.length > maxNegativeLength) {
      maxNegativeLength = element.negativeValues.length;
      maxNegativeIndex = index;
    }
    if (element.positiveValues.length > maxPositiveLength) {
      maxPositiveLength = element.positiveValues.length;
      maxPositiveIndex = index;
    }
  });
  return {
    negative: maxNegativeIndex,
    positive: maxPositiveIndex
  };
};

const BasicComposedChart = ({
  data,
  loading,
  positiveLabel = "Positive of: ",
  negativeLabel = "Negative of: ",
  lineLabel = "Line"
}: IProps) => {
  const classes = useStyles();
  const maxIndices = maxLengthIndex(data);
  return (
    <React.Fragment>
      {loading && <CircularProgress size={100} className={classes.root} />}
      {!loading && (
        <ComposedChart
          width={500}
          height={400}
          data={data}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis />
          <Tooltip isAnimationActive={false} />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          {data.length > 0 &&
            data[maxIndices.positive].positiveValues.map((value, index) => {
              return (
                <Bar
                  key={`positiveBar_${index}`}
                  dataKey={`positiveValues[${index}].value`}
                  name={positiveLabel + value.name}
                  fill={POSITIVECOLORS[index % POSITIVECOLORS.length]}
                  stackId="stack"
                />
              );
            })}
          {data.length > 0 &&
            data[maxIndices.negative].negativeValues.map((value, index) => {
              return (
                <Bar
                  key={`negativeBar_${index}`}
                  dataKey={`negativeValues[${index}].value`}
                  name={negativeLabel + value.name}
                  fill={NEGATIVECOLORS[index % NEGATIVECOLORS.length]}
                  stackId="stack"
                />
              );
            })}
          <Line
            dataKey="lineValue"
            name={lineLabel}
            stroke="#FF7300"
            isAnimationActive={false}
          />
        </ComposedChart>
      )}
    </React.Fragment>
  );
};

export default BasicComposedChart;
