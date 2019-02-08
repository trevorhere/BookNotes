import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../gql/queries/CurrentUser";
import mutation from "../gql/mutations/Login";
import background from "../assets/stars.jpg";

import {
  Grid,
  withStyles,
  TextField,
  Button,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: `url(${background})`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
    overflow: "hidden"
  },
  textField: {
    color: "#000"
  },
  form: {
    minHeight: "100vh",
    alignItems: "center"
  },
  title: {
    fontSize: "30px",
    marginTop: "60px",
    marginBottom: "10px",
    fontWeight: "100"
  },
  button: { marginTop: "10px", marginBottom: "10px" },
  taButton: {
    marginTop: "10px",
    marginBottom: "10px",
    color: "#DF2588 !important"
  },
  or: { paddingTop: "10px" },
  input: {
    color: "white !important",
    borderColor: "white"
  },
  cssLabel: {
    color: "white"
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
      color: "white !important"
    }
  },
  multilineColor: {
    color: "white !important"
  },
  input: {
    color: "white !important"
  },
  multilineColor: {
    color: "white !important"
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important"
  },
  paper: {
    padding: "20px",
    textAlign: "right",
    fontWeight: "100",
    fontSize: "85px"
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "example@email.com",
      password: "example"
    };
  }
  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push("/books");
    }
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("props", this.props);
    const { email, password } = this.state;

    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.form}
          container
          justify={"center"}
          alignContent={"center"}
          spacing={24}
        >
          <Grid item lg={3} md={3} xs={0}>
            <Typography
              className={classes.paper}
              variant={"title"}
              align={"center"}
              color={"primary"}
            >
              What have you been reading about?
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} xs={11}>
            <form onSubmit={this.onSubmit.bind(this)} className="col s6">
              <Button
                variant="outlined"
                size="large"
                fullWidth
                color={"secondary"}
                className={classes.taButton}
                type="submit"
                value="submit"
              >
                CS 356 TA CLICK HERE
              </Button>
              <TextField
                label={`Email`}
                fullWidth
                style={{ color: "white !important" }}
                value={this.state.email}
                InputProps={{
                  classes: {
                    input: classes.multilineColor
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.multilineColor
                  },
                  inputMode: "numeric"
                }}
                className={classes.textField}
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Password"
                fullWidth
                InputProps={{
                  classes: {
                    input: classes.multilineColor
                  }
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.multilineColor
                  },
                  inputMode: "numeric"
                }}
                type={"password"}
                className={classes.textField}
                color={"secondary"}
                value={this.state.password}
                onChange={e =>
                  this.setState({
                    password: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="outlined"
                size="large"
                fullWidth
                color={"primary"}
                className={classes.button}
                type="submit"
                value="submit"
              >
                Login
              </Button>
              <Typography
                className={classes.or}
                variant={"title"}
                align={"center"}
                color={"primary"}
              >
                or
              </Typography>
              <Button
                color={"secondary"}
                variant="outlined"
                size="large"
                fullWidth
                className={classes.button}
                onClick={() => {
                  this.props.history.push(`/signup`);
                }}
              >
                Signup
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(query)(graphql(mutation)(withStyles(styles)(LoginForm)));
