import React from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/place/:id" component={MainPage}></Route>
        <Route exact path="/search" component={SearchPage}></Route>
        <Route exact path="/" component={MainPage}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
