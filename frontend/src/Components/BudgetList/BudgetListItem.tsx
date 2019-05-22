import { Collapse, ListItem, ListItemText, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { IBudget } from "../../Models/BudgetModel";
import ProgressBar from "../ProgressBar";
import TransactionListItemIcon from "../../Views/TransactionList/TransactionListItemIcon";

const useStyles = makeStyles((theme: Theme) => ({}));

interface IProps {
  budget: IBudget;
  categoryText: string;
  categoryIcon: string;
  load: number;
}

const toDisplayDate = (d: Date) => {
  const pad = (s: number) => (String(s).length < 2 ? "0" + s : s);
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const date = d.getFullYear() + "-" + month + "-" + day;
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const time = hours + ":" + minutes;
  return date + " " + time;
};

const BudgetListItem = ({
  budget,
  categoryText,
  categoryIcon,
  load
}: IProps) => {
  const classes = useStyles();
  const [shown, setShown] = React.useState(false);

  useEffect(() => {
    setShown(true);
  });

  const primaryText = categoryText;

  const parsedStartDate = new Date(budget.startDate);
  const parsedEndDate = new Date(budget.endDate);

  const startDateString = toDisplayDate(parsedStartDate).split(" ")[0];
  const endDateString = toDisplayDate(parsedEndDate).split(" ")[0];
  return (
    <Collapse in={shown}>
      <ListItem button={true}>
        <TransactionListItemIcon
          iconId={categoryIcon !== "" ? categoryIcon : undefined}
        />
        <ListItemText
          primary={primaryText + " " + startDateString + " - " + endDateString}
          secondary={load + "/" + budget.amount + "\u20AC"}
        />
        <ProgressBar capacity={budget.amount} load={load} />
      </ListItem>
    </Collapse>
  );
};

export default BudgetListItem;
