import React, { useGlobal } from "reactn";
import { Route } from "react-router-dom"
import NotFound from "../components/not-found/NotFound"


const ProtectedRoute = (props) => {

    const [loginResult] = useGlobal("loginResult");
    const enabledRoles = props.roles;
    const component = (!enabledRoles || enabledRoles.includes(loginResult?.user.role)) ? props.component : NotFound;

    return (
        <Route exact={props.exact} path={props.path} component={component} />
    );
}

export default ProtectedRoute;
