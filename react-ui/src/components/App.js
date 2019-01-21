import React, { Component } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import HomePage from "./HomePage";
import Nav from "./Nav";
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    // fetch("/api")
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`status ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then(json => {
    //     this.setState({
    //       message: json.message,
    //       fetching: false
    //     });
    //   })
    //   .catch(e => {
    //     this.setState({
    //       message: `API call failed: ${e}`,
    //       fetching: false
    //     });
    //   });
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          {/* <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/dashboard/team/:teamID/user/:userID" component={requireAuth(ViewUser)} />
          <Route path="/dashboard/team/:teamID/createuser" component={requireAuth(CreateUser)} />
          <Route path="/dashboard/team/:teamID" component={requireAuth(ViewTeam)} />
          <Route path="/dashboard/createteam" component={requireAuth(CreateTeam)} />
          <Route path="/dashboard/list/:listID/assignlist" component={requireAuth(AssignList)} />
          <Route path="/dashboard/list/:listID/task/:taskID" component={requireAuth(ViewTask)} />
          <Route path="/dashboard/list/:listID/createtask" component={requireAuth(CreateTask)} />
          <Route path="/dashboard/list/:listID" component={requireAuth(ViewList)} />
          <Route path="/dashboard/createlist" component={requireAuth(CreateList)} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route path="/sms_instructions" component={SMSInstructions} /> */}
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
