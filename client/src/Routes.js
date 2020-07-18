import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import PlacesList from './containers/PlacesList/PlacesList';
import AddPlace from './containers/AddPlace/AddPlace';
import Place from './containers/Place/Place';

const ProtectedRoute = ({ isAllowed, ...props }) => {
  return isAllowed ? <Route {...props} /> : <Redirect to="/login" />;
};

const Routes = ({ user }) => {
  return (
    <Switch>
      <Route path="/" exact component={PlacesList} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <ProtectedRoute
        isAllowed={user}
        path="/places/add"
        exact
        component={AddPlace}
      />
      {/*<Route path="/places/add" exact component={AddPlace} />*/}
      <Route path="/place/:id" exact component={Place} />
    </Switch>
  );
};

export default Routes;
