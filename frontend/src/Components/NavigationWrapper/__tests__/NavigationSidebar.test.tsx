import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter as Router } from "react-router-dom";

import NavigationSidebar from "../NavigationSidebar";

describe("<NavigationSidebar />", () => {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    }
  });

  it("Redirects to the correct route when clicking on a route", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Router initialEntries={["foo"]}>
          <NavigationSidebar />
        </Router>
      </ThemeProvider>
    );

    const listItems = wrapper.find("ListItem");
    expect(listItems.length).not.toEqual(0);

    listItems.first().simulate("click");

    expect(
      wrapper.find("Router").prop("history").location.pathname
    ).not.toEqual("foo");
  });
});
