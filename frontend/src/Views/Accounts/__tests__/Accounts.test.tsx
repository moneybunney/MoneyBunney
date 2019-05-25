import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { mount } from "enzyme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Accounts from "../Accounts";

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
