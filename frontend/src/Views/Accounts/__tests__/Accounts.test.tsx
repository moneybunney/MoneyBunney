import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { mount } from "enzyme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { IAccount } from "../../../Models/AccountModel";

import Accounts from "../Accounts";

jest.mock("../../../Utilities/Api");
import { getAccounts } from "../../../Utilities/Api";

getAccounts.mockImplementation(async () => [] as IAccount[]);

describe("<Accounts />", () => {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    }
  });

  it("Doesn't crash when rendering", () => {
    expect(() => {
      mount(
        <ThemeProvider theme={theme}>
          <Router>
            <Accounts />
          </Router>
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});
