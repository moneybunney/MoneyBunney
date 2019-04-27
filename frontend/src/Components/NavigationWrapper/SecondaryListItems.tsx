import { AccountCircle, Settings } from "@material-ui/icons";
import React from "react";
import { AccountInfoLocation, SettingsLocation } from "../../routes.constants";
import NavigationListItem from "./NavigationListItem";

export const SecondaryListItems = () => (
  <React.Fragment>
    <NavigationListItem text="Account" route={AccountInfoLocation}>
      <AccountCircle />
    </NavigationListItem>
    <NavigationListItem text="Settings" route={SettingsLocation}>
      <Settings />
    </NavigationListItem>
  </React.Fragment>
);

export default SecondaryListItems;
