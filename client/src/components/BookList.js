import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, Mutation, Query } from "react-apollo";
import fetchUser from "../gql/queries/CurrentUser";
import createBookMutation from "../gql/mutations/CreateBook";
import Loading from "./Loading";
import BookGrid from "./BookGrid";
import StyledDialog from "./StyledDialog";
import defaultBookCover from "../assets/noBookCover.png";

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  withStyles,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Grid,
  AppBar,
  Slide,
  Toolbar,
  IconButton,
  CloseIcon,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  SwipeableDrawer,
  Switch,
  Popper,
  Fade
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const moment = require("moment");

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignSelf: "center",
    overflow: "hidden",
    margin: "3%"
  },
  card: {
    height: 300,
    width: 200,
    margin: 5
  },
  darkButton: {
    margin: 10
  },
  media: {
    minHeight: 300,
    minWidth: 100,
    backgroundSize: "cover",
    backgroundColor: "#000"
  },

  check: {
    width: "80vw"
  },
  secondaryFab: {
    margin: 0,
    top: "auto",
    right: 120,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },

  fab: {
    backgroundColor: "primary",
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },
  leftFab: {
    backgroundColor: "primary",
    margin: 0,
    top: "auto",
    left: 20,
    bottom: 20,
    right: "auto",
    position: "fixed"
  },
  Grid: {
    justifyContent: "center",
    margin: "2%"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "40px",
    margin: "10px",
    color: "white",
    fontWeight: "100",
    marginTop: "30vh",
    width: "100%"
  },
  dialogPaper: {
    color: "white !important"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },

  multilineColor: {
    color: "white !important"
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `white !important`
    }
  },
  cssLabel: {
    color: "white"
  },
  cssFocused: {},
  notchedOutline: {},

  cardField: {
    color: "white !important"
  },
  menuCard: {
    backgroundColor: "#0d0e0f !important",
    margin: "4%",
    minWidth: 40
  },
  menuCardButton: {
    marginLeft: 20
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class BookList extends Component {
  constructor(props) {
    super(props);

    this.searchForBook = this.searchForBook.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);

    this.state = {
      open: false,
      sort: "none",
      imageUrl: "",
      title: "",
      author: "",
      snack: false,
      searchResults: [],
      typingTimeout: 0,
      typing: false,
      checked: false,
      menu: false
    };
  }

  searchForBook = (event, keyword) => {
    event.preventDefault();

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    setTimeout({}, this.typingTimeout);

    this.typingTimeout = setTimeout(
      fetch(`/bookSearch/${keyword}`)
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          this.setState({
            searchResults: responseJson
          });
        })
        .catch(error => {
          console.error(error);
        }),

      this.typingTimeout
    );
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleMenu = () => {
    this.setState({ menu: !this.state.menu });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  dialogueSubmit = (addBook, book, refetch) => {
    console.log("book", book);
    const { image, title, author } = book;

    if (!image) {
      image = defaultBookCover;
    }
    let createdAt = moment().format("MM/DD/YY");
    let userID = this.props.data.user.id;

    addBook({
      variables: {
        userID,
        imageUrl: image,
        title,
        author,
        createdAt
      },
      refetchQueries: [{ fetchUser }]
    });

    this.handleClose();

    // refetch();
    // this.props.data.refetch();
    // this.props.data.refetch();
    setTimeout(function() {
      if (true) {
        console.log("time out running");
        refetch();
      }
    }, 200);

    // setTimeout();
    // console.log("sposed to refetch");
    // refetch();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  renderSearchResults = (results, refetch) => {
    return results.map((book, i) => {
      return (
        <Mutation
          mutation={createBookMutation}
          onCompleted={() => {
            console.log("mutation complete");
            refetch();
          }}
          onError={this.onError}
        >
          {addBook => {
            return (
              <ListItem key={i} button>
                <ListItemText
                  onClick={() => {
                    this.dialogueSubmit(addBook, book, refetch);
                  }}
                  primary={
                    <Typography variant="h5" style={{ color: "#fff" }}>
                      {book.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="h6" style={{ color: "#3F5CEA" }}>
                      {book.author}
                    </Typography>
                  }
                />
              </ListItem>
            );
          }}
        </Mutation>
      );
    });
  };

  renderDialogue(refetch) {
    const { classes, match } = this.props;

    return (
      <Dialog
        className={classes.dialogPaper}
        PaperProps={{
          style: {
            backgroundColor: "#1F2627",
            boxShadow: "none",
            padding: 50,
            paddingTop: 150,
            color: "white"
          }
        }}
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <div className={classes.dialogPaper}>
          <TextField
            autoFocus
            margin="none"
            id="imageUrl"
            label="Search"
            type="text"
            InputLabelProps={{
              classes: {
                root: classes.multilineColor,
                focused: classes.multilineColor
              }
            }}
            InputProps={{
              classes: {
                input: classes.multilineColor,
                root: classes.multilineColor,
                focused: classes.multilineColor
              }
            }}
            className={classes.cardField}
            onChange={event => this.searchForBook(event, event.target.value)}
            fullWidth
          />
          <List>
            {this.renderSearchResults(this.state.searchResults, refetch)}
          </List>
          <DialogActions>
            <Button
              className={classes.fab}
              onClick={this.handleClose}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Query
        query={fetchUser}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return <Loading loading={this.props.data.loading} />;
          } else if (error || !data.user) {
            console.log(error);

            return <div>error: {error}...</div>;
          }
          const { user } = data;

          return (
            <div className={classes.root}>
              <BookGrid
                history={this.props.history}
                sort={this.state.sort}
                books={user.books}
                menu={this.state.menu}
              />
              {this.renderDialogue(refetch)}
              <div />

              <Fab
                color="secondary"
                aria-label="Add"
                onClick={this.handleClickOpen}
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </div>
          );
        }}
      </Query>
    );
  }
}

BookList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookList);
