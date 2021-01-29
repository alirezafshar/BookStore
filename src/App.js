import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BookStore from "./components/BookStore/BookStore";

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} component={BookStore} />
      </Switch>
    </BrowserRouter>
  )

}

export default App;
