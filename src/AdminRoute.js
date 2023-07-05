import { Route, Redirect } from "react-router-dom";
import { getToken } from "./services/authoriz";

// เช็คว่า login หรือไม่
const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            getToken()
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }}
                />
        }
    />
)


export default AdminRoute;