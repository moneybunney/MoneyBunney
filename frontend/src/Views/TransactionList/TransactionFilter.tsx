import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import FilterPopupButton from "../FilterPopupButton";
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

  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);

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

  return (
    <FilterPopupButton>
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
    </FilterPopupButton>
  );
};

export default TransactionFilter;
