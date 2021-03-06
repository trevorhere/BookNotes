import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../gql/queries/CurrentUser";
import mutation from "../gql/mutations/Signup";
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
    color: "white !important"
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

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push("/books");
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { email, password, name, position, phoneNumber } = this.state;
    this.props.mutate({
      variables: { email, password, name, position, phoneNumber },
      refetchQueries: [{ query }]
    });

    this.props.history.push("/books");
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
              <div className="input-field">
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
                  onChange={e =>
                    this.setState({
                      email: e.target.value
                    })
                  }
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
                      notchedOutline: classes.notchedOutline,
                      input: classes.multilineColor
                    },
                    inputMode: "numeric"
                  }}
                  className={classes.textField}
                  value={this.state.fullName}
                  onChange={e =>
                    this.setState({
                      fullName: e.target.value
                    })
                  }
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <div className="input-field">
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
                  onChange={e =>
                    this.setState({
                      password: e.target.value
                    })
                  }
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
                  onChange={e =>
                    this.setState({
                      userName: e.target.value
                    })
                  }
                  margin="normal"
                  variant="outlined"
                />
              </div>
              <Button
                color={"primary"}
                variant="outlined"
                size="large"
                fullWidth
                className={classes.button}
                type="submit"
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
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(withStyles(styles)(SignupForm))
);

// export default withStyles(styles)(SignupForm);
