import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Single from './components/Single';
import Create from './components/Create';
import Edit from './components/Edit';
import Login from './components/Login';
import AdminRoute from './AdminRoute';


const MyRoute = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={App} />
                <AdminRoute path='/create' exact component={Create} />
                <Route path='/read/:slug' exact component={Single} />
                <AdminRoute path='/edit/:slug' exact component={Edit} />
                <Route path='/login' exact component={Login} />

            </Switch>
        </BrowserRouter>
    )
}

export default MyRoute;