import {
  createStyles,
  ListItem,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";
import TransactionListItemIcon from "./TransactionListItemIcon";

// inspiration https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/ButtonBase/TouchRipple.js
// tslint:disable:object-literal-key-quotes
const styles = (theme: Theme) =>
  createStyles({
    textContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "0 16px",
      justifyContent: "space-between"
    },
    gradientRectanglePrimary: {
      background: "linear-gradient(-45deg, #ffffff, #f5f5f5)",
      backgroundSize: "400% 400%",
      animation: "gradient 2s ease infinite",
      width: "50%",
      marginBottom: 8,
      height: "1em",
      verticalAlign: "top"
    },
    gradientRectangleSecondary: {
      background: "linear-gradient(-90deg, #ffffff, #f8f8f8)",
      backgroundSize: "400% 400%",
      animation: "gradient 1s ease infinite",
      width: "35%",
      height: "0.875em",
      verticalAlign: "bottom"
    },
    "@keyframes gradient": {
      "0%": {
        "background-position": "0% 0%"
      },
      "50%": {
        "background-position": "50% 100%"
      },
      "100%": {
        "background-position": "0% 0%"
      }
    }
  });

interface IProps extends WithStyles<typeof styles> {}

const TransactionListLoadingItem = ({ classes }: IProps) => {
  return (
    <ListItem button={false}>
      <TransactionListItemIcon loading={true} />
      <div className={classes.textContainer}>
        <div className={classes.gradientRectanglePrimary} />
        <div className={classes.gradientRectangleSecondary} />
      </div>
    </ListItem>
  );
};

export default withStyles(styles)(TransactionListLoadingItem);
