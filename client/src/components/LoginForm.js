import React, { Component } from "react";
import background from "../assets/stars.jpg";
import loginMutation from "../gql/mutations/Login";
import currentUserQuery from "../gql/queries/CurrentUser";

import { graphql } from "react-apollo";
import {
  Grid,
  withStyles,
  TextField,
  Button,
  Typography,
  Paper,
  Icon,
  Input,
  InputAdornment
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";

const styles = theme => ({
  root: {
    flexGrow: 1,
    //background: `linear-gradient(rgba(10,10,10, .0), rgba(20,20,20, .0)),url(${background})`,
    background: `url(${background})`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed"
  },
  textField: {
    color: "#000"
  },
  form: {
    height: "100vh",
    alignItems: "center"
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
    color: "white",
    fontWeight: "100"
  },
  button: {
    //  margin: theme.spacing.unit
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
      name: "",
      email: "",
      password: ""
    };
  }

  onSubmit(event) {
    //  event.preventDefault();
    console.log("props", this.props);
    const { email, password } = this.state;

    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ currentUserQuery }]
    });

    this.props.history.push(`/books`);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

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
          <Grid item lg={3} md={3} xs={6}>
            <Typography
              className={classes.paper}
              variant={"title"}
              align={"center"}
              color={"primary"}
            >
              What have you been reading about?
            </Typography>
          </Grid>
          <Grid item lg={3} md={3} xs={6}>
            {/* <Typography
              className={classes.title}
              color={"secondary"}
              align={"center"}
            >
              Book Notes
            </Typography> */}

            <TextField
              id="outlined-name"
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
              onChange={this.handleChange("email")}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
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
              onChange={this.handleChange("password")}
              margin="normal"
              variant="outlined"
            />

            <Button
              variant="outlined"
              size="large"
              fullWidth
              color={"primary"}
              className={classes.button}
              onClick={() => {
                this.onSubmit();
              }}
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
            <br />
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
          </Grid>
        </Grid>
      </div>
    );
  }
}
// export default withStyles(styles)(LoginForm);

export default graphql(loginMutation)(withStyles(styles)(LoginForm));
