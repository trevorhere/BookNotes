import React, { Component } from "react";
import { graphql, compose, Mutation, Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import fetchUser from "../gql/queries/CurrentUser";
import createBookMutation from "../gql/mutations/CreateBook";
import Loading from "./Loading";

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
  TextField,
  Grid,
  Divider
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const moment = require("moment");
const blank = require("../assets/blankBook.png");
const styles = {
  card: {
    height: 300,
    width: 200,
    margin: 5
    // background: `linear-gradient(rgba(20,20,20, .75), rgba(20,20,20, .75)),url(${background})`
  },
  darkButton: {
    margin: 10
  },
  media: {
    minHeight: 300,
    minWidth: 100,
    backgroundSize: "cover"
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "start",
    overflow: "hidden",
    marginTop: 100
    // backgroundColor: theme.palette.background.paper
  },
  check: {
    width: "80vw"
  },

  fab: {
    backgroundColor: "primary",
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
  Grid: {
    justifyContent: "center",
    border: "1px solid red"
    // borderWidth: "50%"
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
        <Typography className={classes.title}>No Books Added Yet</Typography>
        // <Card className={classes.card}>
        //   <CardActionArea>
        //     <CardMedia
        //       className={classes.media}
        //       image={blank}
        //       title={"Add book"}
        //     />
        //     <CardContent>
        //       <Typography gutterBottom variant="h5" component="h2">
        //         No Books Yet
        //       </Typography>
        //       <Typography component="p" />
        //     </CardContent>
        //   </CardActionArea>
        // </Card>
      );
    } else {
      return books.map(book => {
        return (
          <Card key={book.title} className={classes.card}>
            <CardActionArea
              onClick={() => {
                this.props.history.push(`/books/${book.id}`);
              }}
            >
              <CardMedia
                className={classes.media}
                image={book.imageUrl}
                title={book.title}
              />
              {/* <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {book.title}
                </Typography>
                <Typography component="p">{book.author}</Typography>
              </CardContent> */}
            </CardActionArea>
            {/* <CardActions>
              <Button
                size="large"
                fullWidth
                variant="contained"
                className={classes.darkButton}
                onClick={() => {
                  this.props.history.push(`/books/${book.id}`);
                }}
              >
                View
              </Button>
              <br />
            </CardActions> */}
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
            return <Loading loading={this.props.data.loading} />;
          } else if (error || !user) {
            return <div>error: {error}...</div>;
          }

          return (
            <div className={classes.root}>
              <br />
              <br />
              <Grid container className={classes.Grid} spacing={24}>
                {/* <Typography className={classes.title}>Your Books</Typography> */}

                {this.renderBookCard(user.books)}
              </Grid>
              {this.renderDialogue()}
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
