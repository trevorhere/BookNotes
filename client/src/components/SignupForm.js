import React, { Component } from "react";
import background from "../assets/Books.jpeg";
import { graphql } from "react-apollo";
import {
  Grid,
  withStyles,
  TextField,
  Button,
  Typography
} from "@material-ui/core";

// import query from '../gql/queries/CurrentUser';
// import mutation from '../gql/mutations/Login';
const image = require("../assets/gatsby.png");

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: `linear-gradient(rgba(20,20,20, .99), rgba(20,20,20, .75)),url(${background})`,
    height: "96vh",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white"
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
    marginBottom: "10px"
  },
  button: {
    //  margin: theme.spacing.unit
  },
  or: { paddingTop: "10px" },
  multilineColor: {
    color: "white",
    borderColor: "white"
  },
  cssLabel: {
    color: `${theme.palette.secondary.main} !important`
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `white !important`
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.secondary.main} !important`
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

  componentWillUpdate(nextProps) {
    // if (!this.props.data.user && nextProps.data.user) {
    //   this.props.history.push("/dashboard");
    // }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit(event) {
    event.preventDefault();
    console.log("props", this.props);
    const { email, password } = this.state;

    // this.props.mutate({
    //   variables: { email, password },
    //   refetchQueries: [{ query }]
    // });
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
          <Grid item lg={3} md={3} xs={6}>
            <Typography
              className={classes.title}
              color={"secondary"}
              align={"center"}
            >
              Book Notes
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
            <Typography
              className={classes.or}
              variant={"title"}
              align={"center"}
              color={"secondary"}
            >
              or
            </Typography>
            <TextField
              id="outlined-name"
              label="Email"
              fullWidth
              className={classes.textField}
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
                  notchedOutline: classes.notchedOutline
                },
                inputMode: "numeric"
              }}
              onChange={this.handleChange("email")}
              margin="normal"
              variant="outlined"
            />
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
                  notchedOutline: classes.notchedOutline
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
                  notchedOutline: classes.notchedOutline
                },
                inputMode: "numeric"
              }}
              className={classes.textField}
              value={this.state.userName}
              onChange={this.handleChange("userName")}
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
                  notchedOutline: classes.notchedOutline
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
              color={"secondary"}
              variant="outlined"
              size="large"
              fullWidth
              className={classes.button}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(SignupForm);

//export default graphql(query)(graphql(mutation)(LoginForm));
