import { Button, CircularProgress, Theme } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { delet } from "../Utilities/Http";

const useStyles = makeStyles((theme: Theme) => ({
  common: {
    marginRight: "8px"
  }
}));

const DeleteItemButton = ({
  path,
  params,
  onDeleted
}: {
  path: string;
  params: Map<string, string>;
  onDeleted: () => void;
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const deleteSubmit = async () => {
    setLoading(true);
    // await delet(path, params);
    setLoading(false);
    onDeleted();
  };

  return loading ? (
    <CircularProgress size={24} className={classes.common} />
  ) : (
    <Clear onClick={deleteSubmit} className={classes.common} />
  );
};

export default DeleteItemButton;
