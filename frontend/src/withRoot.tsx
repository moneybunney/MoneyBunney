import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from "@material-ui/core";
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

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
