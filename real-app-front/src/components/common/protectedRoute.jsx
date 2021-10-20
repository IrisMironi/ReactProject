import { Route, Redirect } from "react-router-dom";
import userService from "../../services/usersService";

const ProtectedRoute = ({ component: Component, render, biz, ...rest }) => {
  const currentUser = userService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser || (biz && !currentUser.biz)) {
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location },
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
