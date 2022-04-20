import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/city">
          <MainPage></MainPage>
        </Route>
        <Route exact path="/search" component={SearchPage}></Route>
        <Route exact path="/" component={MainPage}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
