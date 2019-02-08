import React, { Component } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import requireAuth from "./requireAuth";
import { graphql } from "react-apollo";
import query from "../gql/queries/CurrentUser";

import Nav from "./Nav";
import BookList from "./BookList";
import Book from "./Book";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import "./styles/App.css";

const App = props => {
  return (
    <div>
      <Nav props={props} />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/books/:bookID" component={requireAuth(Book)} />
        <Route path="/books" component={requireAuth(BookList)} />
        <Route path="/" component={LoginForm} />
      </Switch>
    </div>
  );
};
export default graphql(query)(App);
