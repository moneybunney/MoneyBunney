import { Chip, createStyles, Grid, TextField, Theme, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import ChipArray from "./ChipArray";

const styles = (theme: Theme) => createStyles({
    chips: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: theme.spacing.unit,
      },
    chip: {
        margin: theme.spacing.unit / 4,
      },
  });

interface IProps extends WithStyles<typeof styles> {
    onChange: (tags: string[]) => void;
    tags: string[];
}

const TagPicker = ({tags, classes, onChange}: IProps) => {

    const removeTag = (tag: string) => {
        const tmp = tags.filter((item) => item !== tag);
        onChange(tmp);
    };

    const renderTags = () => {
        return (
            <ChipArray chips={tags} onRemove={removeTag}/>
        );
    };
    return(
        <React.Fragment>
            <Grid item={true} xs={12} sm={6}>
                <TextField
                    id="tag-field"
                    label="Add a Tag"
                    type="text"
                    InputLabelProps={{shrink: true}}
                    fullWidth={true}
                />
            </Grid>
            <Grid item={true} xs={12} sm={6} className={classes.chips}>
                {renderTags()}
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(TagPicker);
