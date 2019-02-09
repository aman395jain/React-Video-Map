import React from "react";
import { Switch, Route } from "react-router-dom";
import CarManagement from "./components/user/car-management/carManagement";
import CarDetail from "./components/user/car-details/carDetail";
import GoogleMapComponent from "./components/user/Google-Map/googleMapRoute";
import barChart from "./components/user/forms/modalForm";

const Router = () => (
  <Switch>
    <Route exact path="/" component={CarManagement} />
    <Route exact path="/carDetails/:incidentId" component={CarDetail} />
    <Route exact path="/googleMapComponent" component={GoogleMapComponent} />
    <Route exact path="/barChart" component={barChart} />
  </Switch>
);

export default Router;
