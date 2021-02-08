import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BookStore from "./components/BookStore/BookStore";

const App = () => {

  return (
    <BrowserRouter>
      <Route path={"/"} component={BookStore} />
    </BrowserRouter>
  )

}

export default App;
