import { createMuiTheme, CssBaseline } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";

import * as React from "react";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     contrastText: "#fff",
  //     dark: "#363839",
  //     light: "#e5e5e5",
  //     main: "#727272",
  //   },
  //   secondary: {
  //     contrastText: "#fff",
  //     dark: "#a90000",
  //     light: "#ff5e50",
  //     main: "#e41e26",
  //   },
  // },
  typography: {
    useNextVariants: true
  }
});

function withMaterialUiRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // ThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <ThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithRoot;
}

export default withMaterialUiRoot;
