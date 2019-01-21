import React, { Component } from "react";
import { Navbar, NavItem } from "react-materialize";
import { Link } from "react-router-dom";

class Nav extends Component {
  renderButtons() {
    let user = false;

    if (user) {
      return <NavItem onClick={() => console.log("test click")}>Home</NavItem>;
    }

    return (
      <div>
        <NavItem
          onClick={() => {
            this.props.props.history.push(`/signup`);
          }}
        >
          Signup
        </NavItem>
        <NavItem
          onClick={() => {
            this.props.props.history.push(`/login`);
          }}
        >
          Login
        </NavItem>
      </div>
    );
  }
  render() {
    return (
      <Navbar brand="retron" right>
        {console.log("nav", this.props)}
        {this.renderButtons()}
      </Navbar>
    );
  }
}

export default Nav;
