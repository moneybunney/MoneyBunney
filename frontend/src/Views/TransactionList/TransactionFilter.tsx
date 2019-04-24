import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
  emptyFilterObject,
  FilterKeys,
  IFilterItems,
  IFilters
} from "../../Models/TransactionFilterModel";
import FilterPopupButton from "./FilterPopupButton";
import FilterSelect from "./FilterSelect";

const useStyles = makeStyles(() => ({
  filterPopup: {
    width: "450px",
    height: "350px",
    padding: "20px"
  }
}));

type SetStateAction<S> = S | ((prevState: S) => S);
interface IProps {
  setFilters: (value: SetStateAction<IFilters>) => void;
  filters: IFilters;
  items: IFilterItems;
  className?: string;
}

const TransactionFilter = ({
  setFilters,
  filters,
  items,
  className
}: IProps) => {
  const classes = useStyles();

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

  const handleReset = () => {
    setFilters(emptyFilterObject);
  };

  return (
    <FilterPopupButton className={className}>
      <div className={classes.filterPopup}>
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={3}>
            <Typography variant="h5">Filters</Typography>
          </Grid>
          <Grid item={true} xs={9}>
            <Button onClick={handleReset} color="primary">
              <Typography color="primary" variant="button">
                Reset
              </Typography>
            </Button>
          </Grid>

          <Grid item={true} xs={12}>
            <FilterSelect
              label="Accounts"
              selected={filters.accounts}
              items={items.accounts}
              handleChange={handleChange("accounts")}
            />
          </Grid>

          <Grid item={true} xs={12}>
            <FilterSelect
              label="Categories"
              selected={filters.categories}
              items={items.categories}
              handleChange={handleChange("categories")}
            />
          </Grid>

          <Grid item={true} xs={12}>
            <FilterSelect
              label="Types"
              selected={filters.transactionTypes}
              items={items.transactionTypes}
              handleChange={handleChange("transactionTypes")}
            />
          </Grid>

          <Grid item={true} xs={12}>
            <FilterSelect
              label="Tags"
              selected={filters.tags}
              items={items.tags}
              handleChange={handleChange("tags")}
            />
          </Grid>
        </Grid>
      </div>
    </FilterPopupButton>
  );
};

export default TransactionFilter;
