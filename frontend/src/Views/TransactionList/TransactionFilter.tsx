import { Button, Fab, Grid, Popover, Typography } from "@material-ui/core";
import { FilterList } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import FilterSelect from "../FilterSelect";

const useStyles = makeStyles(() => ({
  filterPopup: {
    width: "450px",
    height: "350px",
    padding: "20px"
  }
}));

interface IFilters {
  tags: string[];
}
type FilterKeys = keyof IFilters;

const emptyFilterObject: IFilters = {
  tags: []
};

const tags = ["foo", "bar", "baz", "bez", "booze", "bamboozle"];

const TransactionFilter = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);

  const open = !!anchorEl;

  // TODO: The type annotations for the event parameter dont work
  // Typescript thinks that event.target.value is a `string` while
  // Mui passes an array?
  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const handleChange = (field: FilterKeys) => (event: any) => {
    setFilters(oldState => ({
      ...oldState,
      [field]: event.target.value
    }));
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Fab onClick={handleClick} color="secondary" aria-label="Filter">
        <FilterList />
      </Fab>
      <Popover
        id="filter-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <div className={classes.filterPopup}>
          <Grid container={true} spacing={16}>
            <Grid item={true} xs={3}>
              <Typography variant="h5">Filters</Typography>
            </Grid>
            <Grid item={true} xs={9}>
              <Button color="primary">
                <Typography color="primary" variant="button">
                  Reset
                </Typography>
              </Button>
            </Grid>

            <Grid item={true} xs={12}>
              <FilterSelect
                label="Tags"
                selected={filters.tags}
                items={tags}
                handleChange={handleChange("tags")}
              />
            </Grid>
          </Grid>
        </div>
      </Popover>
    </React.Fragment>
  );
};

export default TransactionFilter;
