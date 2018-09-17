import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Place from "./pages/Place";

import "./App.css";

// AIzaSyCuMV8HTZCAxl1GN1VNKOYMUn2_DUttqcs

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Header brand="Restaurant Reviews" />
            <Route exact path="/" component={Home} />
            <Route path="/:place_id" component={Place} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
