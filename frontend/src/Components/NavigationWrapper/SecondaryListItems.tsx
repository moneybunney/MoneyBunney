import { AccountCircle, Settings } from "@material-ui/icons";
import React from "react";
import NavigationListItem from "./NavigationListItem";

export const SecondaryListItems = () => (
  <React.Fragment>
    <NavigationListItem text="Account" route="/account">
      <AccountCircle />
    </NavigationListItem>
    <NavigationListItem text="Settings" route="/settings">
      <Settings />
    </NavigationListItem>
  </React.Fragment>
);

export default SecondaryListItems;
