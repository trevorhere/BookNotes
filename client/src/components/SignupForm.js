import React, { Component } from "react";
import background from "../assets/stars.jpg";
import { graphql, Mutation } from "react-apollo";
import {
  Grid,
  withStyles,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import currentUserQuery from "../gql/queries/CurrentUser";
import signupMutation from "../gql/mutations/Signup";

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
    color: "white !important"
  },
  form: {
    height: "100vh",
    alignItems: "center"
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
    fontWeight: "100"
  },
  button: { marginTop: "10px" },
  or: { paddingTop: "10px" },
  paper: {
    padding: "20px",
    textAlign: "right",
    fontWeight: "100",
    fontSize: "85px"
  },
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
  }
});

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fullName: "",
      userName: ""
    };
  }

  onSubmit = (event, signup) => {
    event.preventDefault();

    const { email, password, fullName, userName } = this.state;

    signup({
      variables: { email, password, fullName, userName },
      refetchQueries: [{ currentUserQuery }]
    });

    this.props.history.push(`/books`);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={signupMutation} onError={this.onError}>
        {signup => {
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
                  <TextField
                    id="outlined-name"
                    label="Full Name"
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
                    className={classes.textField}
                    value={this.state.fullName}
                    onChange={this.handleChange("fullName")}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-name"
                    label="Email"
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
                  <TextField
                    id="outlined-name"
                    label="Username"
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
                    className={classes.textField}
                    value={this.state.userName}
                    onChange={this.handleChange("userName")}
                    margin="normal"
                    variant="outlined"
                  />

                  <Button
                    color={"primary"}
                    variant="outlined"
                    size="large"
                    fullWidth
                    className={classes.button}
                    onClick={event => {
                      this.onSubmit(event, signup);
                    }}
                  >
                    Signup
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
                    variant="outlined"
                    size="large"
                    fullWidth
                    color={"secondary"}
                    className={classes.button}
                    onClick={() => {
                      this.props.history.push(`/login`);
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
//export default withStyles(styles)(SignupForm);

export default graphql(signupMutation)(withStyles(styles)(SignupForm));
