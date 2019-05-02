import { Chip, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
}));

interface IProps {
  chips: string[];
  onRemove: (name: string) => void;
}

interface IChipData {
  key: number;
  label: string;
}

const ChipsArray = ({ chips, onRemove }: IProps) => {
  const classes = useStyles();

  const chipData = chips.map((chip, id) => ({ key: id, label: chip }));

  const handleDelete = (data: IChipData) => () => {
    onRemove(data.label);
  };

  return (
    <React.Fragment>
      {chipData.map(data => {
        return (
          <Chip
            key={data.key}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </React.Fragment>
  );
};

export default ChipsArray;
