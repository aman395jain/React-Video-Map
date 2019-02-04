import React from "react";
import { Switch, Route } from "react-router-dom";
import CarManagement from "./components/user/car-management/carManagement";
import CarDetail from "./components/user/car-management/carDetail";
import googleMap from "./components/user/car-management/Google-Map/googleMap";
import googleMapComponent from "./components/user/car-management/Google-Map/reactGoogleMap";
import testGoogleMap from "./components/user/car-management/Google-Map/directionsComponent";

const Router = () => (
  <Switch>
    <Route exact path="/" component={CarManagement} />
    <Route exact path="/carDetails/:incidentId" component={CarDetail} />
    <Route exact path="/googleMap" component={googleMap} />
    <Route exact path="/googleMapComponent" component={googleMapComponent} />
    <Route exact path="/testGoogleMap" component={testGoogleMap} />
  </Switch>
);

export default Router;
