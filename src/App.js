import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Home } from './Pages/Home';
import Items from './Pages/Items';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/cart">
                <SignUp />
            </Route>
            <Route path="/items">
                <Items />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
