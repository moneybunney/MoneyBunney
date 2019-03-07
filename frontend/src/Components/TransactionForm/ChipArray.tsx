import { Chip, createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

interface IProps extends WithStyles<typeof styles> {
    chips: string[];
    onRemove: (name: string) => void;
}

interface IChipData {
    key: number;
    label: string;
}

const ChipsArray = ({ classes, chips, onRemove}: IProps) => {
    const chipData = chips.map((chip, id) => ({key: id, label: chip }));

    const handleDelete = (data: IChipData) => () => {
        onRemove(data.label);
    };

    return (
        <React.Fragment>
            {chipData.map((data) => {
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

export default withStyles(styles)(ChipsArray);
