import { Theme, Typography, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    height: 30,
    width: 500,
    margin: "auto"
  }
}));

interface IProps {
  capacity: number;
  load: number;
}

const ProgressBar = ({ capacity, load }: IProps) => {
  const classes = useStyles();

  let precentage = (load / capacity) * 100;
  let highLoad = true;
  if (precentage < 80) highLoad = false;

  return (
    <LinearProgress
      variant="determinate"
      value={precentage}
      className={classes.progress}
      color={highLoad ? "secondary" : "primary"}
    />
  );
};

export default ProgressBar;
