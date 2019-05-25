import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter as Router } from "react-router-dom";

import NavigationSidebar from "../NavigationSidebar";
import NavigationWrapper from "../NavigationWrapper";

const StubComponent = () => <div> Foo </div>;

describe("<NavigationWrapper />", () => {
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    }
  });

  it("Renders both the <NavigationSidebar /> and the component given", () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <Router>
          <NavigationWrapper>
            <StubComponent />
          </NavigationWrapper>
        </Router>
      </ThemeProvider>
    );

    expect(wrapper.find(StubComponent).length).toEqual(1);
    expect(wrapper.find(NavigationSidebar).length).toEqual(1);
  });
});
