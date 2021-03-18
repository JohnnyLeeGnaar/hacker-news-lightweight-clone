import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider } from "./contexts/theme";
import Posts from "./screens/Posts";
import Post from "./screens/Post";
import User from "./components/User";
import Nav from "./components/Nav";

import "./index.css";

const TopStories = (props) => <Posts {...props} type="topstories" />;
const NewStories = (props) => <Posts {...props} type="newstories" />;

class App extends Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Switch>
                <Route exact path="/" component={TopStories} />
                <Route path="/new" component={NewStories} />
                <Route path="/user" component={User} />
                <Route path="/post" component={Post} />
                <Route
                  render={() => (
                    <h1 className="error">404, please try again</h1>
                  )}
                />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
