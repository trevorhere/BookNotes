import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  renderButtons() {
    let user = false;

    if (user) {
      return <Button color="inherit">Home</Button>;
    }
    return (
      <div>
        <Button
          color="inherit"
          onClick={() => {
            this.props.props.history.push(`/signup`);
          }}
        >
          Signup
        </Button>
        <Button
          onClick={() => {
            this.props.props.history.push(`/login`);
          }}
          color="inherit"
        >
          Login
        </Button>
      </div>
    );
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              onClick={() => {
                this.props.props.history.push(`/`);
              }}
              variant="h6"
              color="inherit"
              className={classes.grow}
            >
              BookNotes
            </Typography>
            {this.renderButtons()}
          </Toolbar>
        </AppBar>
        {/* <Navbar brand="retron" right>
        {console.log("nav", this.props)}
        {this.renderButtons()}
      </Navbar> */}
      </div>
    );
  }
}

export default withStyles(styles)(Nav);
