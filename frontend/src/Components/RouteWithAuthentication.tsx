import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { isAuthenticated } from "../Utilities/AuthenticationCookies";

interface IProps {
  Component: React.ComponentType;
  onlyLoggedIn: boolean;
  redirectRoute: string;
  path: string;
  exact?: boolean;
}

const RouteWithAuthentication = ({
  Component,
  onlyLoggedIn,
  redirectRoute,
  path,
  exact,
}: IProps) => {

  const render = (props: any) =>
    isAuthenticated() === onlyLoggedIn ? (
      <Component />
    ) : (
      <Redirect
        to={{
          pathname: redirectRoute,
          state: { from: props.location },
        }}
      />
    );

  return <Route path={path} exact={exact ? exact : false} render={render} />;
};

// This is how it should work, with the ...rest props
// But it doesn't because of typescript
// TODO: Fix

// interface IProps {
//   Component: React.ComponentType;
//   onlyLoggedIn: boolean;
//   redirectRoute: string;
// }

// const RouteWithAuthentication = ({
//   Component,
//   onlyLoggedIn,
//   redirectRoute,
//   ...rest
// }: RouteComponentProps<any> & IProps) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated() === onlyLoggedIn ? (
//           <Component />
//         ) : (
//           <Redirect
//             to={{
//               pathname: redirectRoute,
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

export default RouteWithAuthentication;
