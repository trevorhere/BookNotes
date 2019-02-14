import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, Mutation, Query } from "react-apollo";
import fetchUser from "../gql/queries/CurrentUser";
import createBookMutation from "../gql/mutations/CreateBook";
import Loading from "./Loading";
import StyledDialog from "./StyledDialog";
import defaultBookCover from "../assets/noBookCover.png";

import {
  Card,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
  withStyles,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  Divider
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const moment = require("moment");

const styles = {
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
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "start",
    overflow: "hidden",
    marginTop: 100
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
  Grid: {
    justifyContent: "center",
    border: "1px solid red"
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
      imageUrl: "",
      title: "",
      author: "",
      snack: false,
      searchResults: []
    };
  }

  searchForBook = (event, keyword) => {
    event.preventDefault();

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
      });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  snackOpen = () => {
    this.setState({ snack: true });
  };

  snackTimedClose = () => {
    setTimeout(() => {
      return this.snackClose();
    }, 5000);
  };

  snackClose = () => {
    this.setState({ close: false });
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

  renderBookCard(books) {
    const { classes, match } = this.props;

    if (!books.length) {
      return (
        <Typography className={classes.title}>No Books Added Yet</Typography>
      );
    } else {
      return books.map(book => {
        let imageLink;
        {
          book.imageUrl.length > 0
            ? (imageLink = book.imageUrl)
            : (imageLink = defaultBookCover);
        }
        // console.log("book");
        return (
          <Card key={book.id} className={classes.card}>
            <CardActionArea
              onClick={() => {
                this.props.history.push(`/books/${book.id}`);
              }}
            >
              <CardMedia
                className={classes.media}
                image={imageLink}
                // image={book.imageUrl}
                title={book.title}
              />
            </CardActionArea>
          </Card>
        );
      });
    }
  }

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
            InputProps={{
              classes: {
                input: classes.multilineColor
              }
            }}
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
    const { classes, match } = this.props;
    // console.log("props", this.props);

    return (
      <Query
        query={fetchUser}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, refetch }) => {
          const { user } = data;

          if (loading) {
            return <Loading loading={this.props.data.loading} />;
          } else if (error || !user) {
            return <div>error: {error}...</div>;
          }

          return (
            <div className={classes.root}>
              <br />
              <br />
              <Grid container className={classes.Grid} spacing={24}>
                {this.renderBookCard(user.books)}
              </Grid>
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
