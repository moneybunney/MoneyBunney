import {
  Checkbox,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250
    }
  }
};

const useStyles = makeStyles(() => ({
  label: {
    display: "block",
    paddingBottom: "3px"
  },
  select: {
    minWidth: "150px",
    maxWidth: "300px"
  }
}));

interface IProps {
  label: string;
  selected: string[];
  items: string[];
  handleChange: (event: any) => void;
}

const FilterSelect = ({ label, selected, handleChange, items }: IProps) => {
  const classes = useStyles();

  const renderValue = (values: any) => values.join(", ");

  return (
    <>
      <InputLabel className={classes.label} htmlFor="select-multiple-checkbox">
        {label}
      </InputLabel>
      <Select
        className={classes.select}
        multiple={true}
        value={selected}
        onChange={handleChange}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={renderValue}
        MenuProps={MenuProps}
      >
        {items.map(item => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={selected.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default FilterSelect;
