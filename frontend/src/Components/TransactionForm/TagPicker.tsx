import { Chip, createStyles, Grid, TextField, Theme, withStyles, WithStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons"
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
    addTagCell:{
        position: "relative"
    },
    addTagIcon:{
        position: "absolute",
        bottom: theme.spacing.unit
    }
  });

interface IProps extends WithStyles<typeof styles> {
    onChange: (tags: string[]) => void;
    tags: string[];
}

const TagPicker = ({tags, classes, onChange}: IProps) => {
    const [ inputTag, setInputTag ] = React.useState("")
    
    const removeTag = (tag: string) => {
        const tmp = tags.filter((item) => item !== tag);
        onChange(tmp);
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputTag(e.target.value)
    }
    const handleAddTagClick = ()=>{
        if(tags.indexOf(inputTag) == -1){
            // only push tags that are not yet applied
            tags.push(inputTag)
            onChange(tags)
        }
        setInputTag("")
    }
    const renderTags = () => {
        return (
            <ChipArray chips={tags} onRemove={removeTag}/>
        );
    };
    return(
        <React.Fragment>
            <Grid item={true} xs={12} sm={12} className={classes.chips}>
                {renderTags()}
            </Grid>
            <Grid item={true} xs={10} sm={5}>
                <TextField
                    id="tag-field"
                    label="Add a Tag"
                    type="text"
                    value={inputTag}
                    onChange={handleTagInputChange}
                    fullWidth={true}
                />
            </Grid>
            <Grid item={true} xs={2} sm={1} className={classes.addTagCell}>
                <Add onClick={handleAddTagClick} className={classes.addTagIcon}/>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(TagPicker);
