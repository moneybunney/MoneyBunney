import { Button, CircularProgress, Theme } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  common: {
    marginRight: "8px"
  }
}));

const DeleteItemButton = ({
  path,
  params
}: {
  path: string;
  params: Map<string, string>;
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const deleteSubmit = () => {
    setLoading(true);
  };

  return loading ? (
    <CircularProgress size={24} className={classes.common} />
  ) : (
    <Clear onClick={deleteSubmit} className={classes.common} />
  );
};

export default DeleteItemButton;
