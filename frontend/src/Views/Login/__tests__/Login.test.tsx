import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { mount } from "enzyme";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "../Login";

describe("<Login />", () => {
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
            <Login />
          </Router>
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});
