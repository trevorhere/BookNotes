import React, { Component } from "react";
import { graphql, compose, Mutation, Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import fetchUser from "../gql/queries/CurrentUser";
import createBookMutation from "../gql/mutations/CreateBook";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
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
  TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const moment = require("moment");
const blank = require("../assets/blankBook.png");
const styles = {
  card: {
    maxWidth: 300,
    margin: 5
  },
  media: {
    height: 300,
    width: 250
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    overflow: "hidden",
    margin: 10
    // backgroundColor: theme.palette.background.paper
  },

  fab: {
    backgroundColor: "red",
    // position: "absolute",
    // bottom: 40,
    // right: 40,
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },
  darkButton: {}
};

const tileData = [
  // {
  //   img: blank,
  //   title: "Image",
  //   author: "author",
  //   cols: 1
  // },

  {
    img:
      "https://global.penguinrandomhouse.com/wp-content/uploads/2017/12/QueenOfHearts.jpg",
    title: "Image",
    author: "author",
    cols: 1
  },

  {
    img: "https://mppl.org/wp-content/uploads/0-214x300.jpg",
    title: "Image",
    author: "author",
    cols: 1
  },
  {
    img:
      "https://global.penguinrandomhouse.com/wp-content/uploads/2017/12/QueenOfHearts.jpg",
    title: "Image",
    author: "author",
    cols: 1
  },
  {
    img:
      "https://marketplace.canva.com/MACXC0twKgo/1/0/thumbnail_large/canva-green-and-pink-science-fiction-book-cover-MACXC0twKgo.jpg",
    title: "Image",
    author: "author",
    cols: 1
  },
  {
    img:
      "https://marketplace.canva.com/MACV2Ehunsw/1/0/thumbnail_large/canva-blue-photo-science-fiction-book-cover-MACV2Ehunsw.jpg",
    title: "Image",
    author: "author",
    cols: 1
  }
];

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      imageUrl: "",
      title: "",
      author: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  dialogueSubmit = addBook => {
    const { imageUrl, title, author } = this.state;
    let createdAt = moment().format("MM/DD/YY");
    let userID = this.props.data.user.id;

    // createdAt = this.props.mutate({
    //   variables: { userID, imageUrl, title, author, createdAt },
    //   refetchQueries: [{ fetchUser }]
    // });

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
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={blank}
              title={"Add book"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                No Books Yet
              </Typography>
              <Typography component="p" />
            </CardContent>
          </CardActionArea>
        </Card>
      );
    } else {
      return books.map(book => {
        return (
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={book.imageUrl}
                title={book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography component="p">{book.title}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                fullWidth
                variant="outline"
                className={classes.darkButton}
                onClick={() => {
                  this.props.history.push(`/books/${book.id}`);
                }}
                color="primary"
              >
                View
              </Button>
            </CardActions>
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

  renderDialogue() {
    return (
      <Mutation
        mutation={createBookMutation}
        onCompleted={() => {
          this.props.refetch();
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
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    this.dialogueSubmit(addBook);
                  }}
                  color="primary"
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
    console.log("book props", this.props);
    return (
      <Query
        query={fetchUser}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          const { user } = data;

          if (loading) {
            return <div>loading...</div>;
          } else if (error || !user) {
            return <div>error: {error}...</div>;
          }

          return (
            <div className={classes.root}>
              {this.renderDialogue()}
              {this.renderBookCard(user.books)}
              <Fab
                color="primary"
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
