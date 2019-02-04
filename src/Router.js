import React from "react";
import { Switch, Route } from "react-router-dom";
import CarManagement from "./components/user/car-management/carManagement";
import CarDetail from "./components/user/car-details/carDetail";

const Router = () => (
  <Switch>
    <Route exact path="/" component={CarManagement} />
    <Route exact path="/carDetails/:incidentId" component={CarDetail} />
  </Switch>
);

export default Router;
