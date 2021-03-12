import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Posts from "./screens/Posts";
import Post from "./screens/Post";
import User from "./components/User";
import Nav from "./components/Nav";

import "./index.css";

const TopStories = (props) => <Posts {...props} type="topstories" />;
const NewStories = (props) => <Posts {...props} type="newstories" />;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={TopStories} />
            <Route path="/new" component={NewStories} />
            <Route path="/user" component={User} />
            <Route path="/post" component={Post} />
            
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
