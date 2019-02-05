import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import query from "../gql/queries/CurrentUser";
import mutation from "../gql/mutations/Logout";

import { graphql } from "react-apollo";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    fontWeight: "300"
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

  onLogoutClick(event) {
    event.preventDefault();
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <div>
          <Button onClick={this.onLogoutClick.bind(this)} color="secondary">
            LOGOUT
          </Button>
        </div>
      );
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          style={{
            overflow: "hidden",
            background: "transparent",
            boxShadow: "none"
          }}
        >
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
                this.props.props.history.push(`/books`);
              }}
              variant="h6"
              color="secondary"
              className={classes.grow}
            >
              BookThinks
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

// export default withStyles(styles)(Nav);

export default graphql(mutation)(graphql(query)(withStyles(styles)(Nav)));
