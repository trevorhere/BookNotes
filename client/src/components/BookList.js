import React, { Component } from "react";
import { graphql, compose, Mutation, Query } from "react-apollo";
import fetchUser from "../gql/queries/CurrentUser";
import createBookMutation from "../gql/mutations/CreateBook";
import Loading from "./Loading";
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
  Snackbar,
  Fade
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
  }
};

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      imageUrl: "",
      title: "",
      author: "",
      snack: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
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

  dialogueSubmit = addBook => {
    const { imageUrl, title, author } = this.state;
    let createdAt = moment().format("MM/DD/YY");
    let userID = this.props.data.user.id;

    addBook({
      variables: { userID, imageUrl, title, author, createdAt },
      refetchQueries: [{ fetchUser }]
    });

    this.props.data.refetch();
    this.handleClose();
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
        console.log("book");
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

  renderDialogue(refetch) {
    return (
      <Mutation
        mutation={createBookMutation}
        onCompleted={() => {
          refetch();
        }}
        onError={this.onError}
      >
        {addBook => {
          return (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
              <DialogContent>
                <DialogContentText>{}</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="imageUrl"
                  label="Image Url"
                  type="text"
                  onChange={this.handleChange("imageUrl")}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  onChange={this.handleChange("title")}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="author"
                  label="Author"
                  type="text"
                  onChange={this.handleChange("author")}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    this.dialogueSubmit(addBook);
                  }}
                  color="secondary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }

  render() {
    const { classes, match } = this.props;
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

export default withStyles(styles)(BookList);
