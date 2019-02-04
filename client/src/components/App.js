import React, { Component } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import requireAuth from "./requireAuth";

import Nav from "./Nav";
import Landing from "./Landing";
import BookList from "./BookList";
import Book from "./Book";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import "./styles/App.css";

const App = props => {
  return (
    <div>
      <Nav props={props} />
      {console.log("app", props)}
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/books/:bookID" component={requireAuth(Book)} />
        <Route path="/books" component={requireAuth(BookList)} />

        {/*  <Route path="/signup" component={SignupForm} />
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
        <Route path="/" component={SignupForm} />
      </Switch>
    </div>
  );
};

export default App;
