import React, { Component } from "react";
import { graphql, compose, Mutation, Query } from "react-apollo";
import fileDownload from "js-file-download";
import DraftExporter from "draft-js-exporter";
import fetchBook from "../gql/queries/fetchBook";
import updateBookMutation from "../gql/mutations/UpdateBook";
import deleteBookMutation from "../gql/mutations/DeleteBook";
import fetchUser from "../gql/queries/CurrentUser";

import { Editor } from "react-draft-wysiwyg";
import Loading from "./Loading";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Typography,
  withStyles,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Fade
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const res = require("../assets/Trevor_Lane_Resume.pdf");

const styles = {
  root: {
    padding: "2%",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    flexWrap: "wrap"
  },
  card: {
    maxWidth: 250,
    margin: 5
  },
  media: {
    height: 350,
    width: 250
  },
  Grid: {
    justifyContent: "center"
  },
  paper: {
    minHeight: "100%",
    padding: 10,
    marginBottom: 100
  },
  quill: {
    height: "100%"
  },
  tertiaryFab: {
    margin: 0,
    backgroundColor: "#F34539",
    color: "#fff",
    top: "auto",
    right: "auto",
    bottom: 20,
    left: 20,
    position: "fixed"
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
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }
};

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "Test",
      title: "test",
      text: "",
      imageUrl: "",
      editorState: EditorState.createEmpty(),
      json: "",
      data: {},
      loaded: false,
      open: false,
      snack: false,
      saveAvailable: false,
      ubm: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  exportPdf() {
    // // var file = new Blob([res], {
    // //   type: "application/pdf"
    // // });
    // // // saveAs(file, "filename.pdf");
    // // var reader = new window.FileReader();
    // // reader.readAsDataURL(file);
    // // reader.onloadend = function() {
    // //   var base64data = reader.result;
    // //   window.open(base64data);
    // // };
    // // fileDownload(res, "filename.pdf");
    // let rawDraftContentBlock = convertToRaw(this.state.editorState);
    // let exporter = new DraftExporter(rawDraftContentBlock);
    // let contentExported = exporter.export();
  }
  componentWillUnmount() {
    const { author, title, imageUrl } = this.state;
    let bookID = this.props.match.params.bookID;
    let notes = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    this.props.mutate({
      variables: { bookID, imageUrl, title, author, notes }
    });
  }
  onEditorStateChange = (editorState, updateBook) => {
    this.setState({
      editorState
    });

    // if (this.state.saveAvailable) {
    //   this.saveChanges(updateBook);
    //   this.setState({ saveAvailable: false });
    // } else {
    //   setTimeout(this.setState({ saveAvailable: true }), 10000);
    // }

    this.snackOpen();
  };

  handleChange(value) {
    this.setState({ text: value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  dialogueSubmit = deleteBook => {
    const { bookID } = this.props.match.params;

    deleteBook({
      variables: { bookID },
      refetchQueries: [{ fetchUser }]
    });

    this.props.data.refetch();
    this.handleClose();
    this.props.history.push(`/books`);
  };
  snackOpen = () => {
    this.setState({ snack: true });
  };

  snackClose = () => {
    this.setState({ snack: false });
  };
  showText() {
    console.log(
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }

  saveChanges = updateBook => {
    const { author, title, imageUrl } = this.state;
    let bookID = this.props.match.params.bookID;
    let notes = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    updateBook({
      variables: { bookID, imageUrl, title, author, notes }
    });

    this.snackOpen();
  };

  testSetText() {
    this.setState({
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.state.json))
      )
    });
  }

  initializeEditorText(notes) {
    if (notes) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(notes))
        )
      });
    }
  }

  renderDialogue(refetch) {
    return (
      <Mutation
        mutation={deleteBookMutation}
        onCompleted={() => {
          this.props.history.push(`/books`);
        }}
        onError={this.onError}
      >
        {deleteBook => {
          return (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Remove Book?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  All data associated with this book, including notes, will be
                  deleted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button
                  onClick={() => {
                    this.dialogueSubmit(deleteBook);
                  }}
                  color="secondary"
                >
                  Delete
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
    const { editorState } = this.state;
    console.log("bookProps", this.props);
    return (
      <Query
        query={fetchBook}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
        variables={{ bookID: this.props.match.params.bookID }}
        onCompleted={data => {
          if (this.state.loaded) {
            return;
          }

          if (data.book.notes) {
            let { title, author, imageUrl } = data.book;
            this.setState({
              editorState: EditorState.createWithContent(
                convertFromRaw(JSON.parse(data.book.notes))
              ),
              title,
              author,
              imageUrl,
              loaded: true
            });
          } else {
            let { title, author, imageUrl } = data.book;
            this.setState({
              title,
              author,
              imageUrl,
              loaded: true
            });
          }
        }}
      >
        {({ loading, error, data, refetch }) => {
          const { book } = data;

          if (loading) {
            return <Loading loading={this.props.data.loading} />;
          } else if (error || !book) {
            return <div>error: {error}...</div>;
          }

          return (
            <Mutation mutation={updateBookMutation} onError={this.onError}>
              {updateBook => {
                return (
                  <div className={classes.root}>
                    {/* <Button onClick={this.exportPdf}>
                      <a href={res} download>
                        Test
                      </a>
                    </Button> */}
                    <Grid container className={classes.Grid} spacing={24}>
                      <Grid
                        className={classes.innerGrid}
                        item
                        lg={2}
                        md={3}
                        xs={12}
                      >
                        <Card className={classes.card}>
                          <CardActionArea />
                          <CardMedia
                            className={classes.media}
                            image={book.imageUrl}
                            title={book.title}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {book.title}
                            </Typography>
                            <Typography component="p">{book.author}</Typography>
                            <Typography component="p">
                              Added: {book.createdAt}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid
                        className={classes.innerGrid}
                        item
                        lg={4}
                        md={9}
                        xs={12}
                      >
                        <Paper className={classes.paper}>
                          <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={editorState => {
                              this.onEditorStateChange(editorState, updateBook);
                            }}
                          />
                        </Paper>
                        {this.renderDialogue(refetch)}
                        <Snackbar
                          open={this.state.snack}
                          onClose={this.snackClose}
                          TransitionComponent={Fade}
                          ContentProps={{
                            "aria-describedby": "message-id"
                          }}
                          message={<span id="message-id">Text Saved</span>}
                        />
                      </Grid>
                    </Grid>
                    <Fab
                      onClick={this.handleClickOpen}
                      size="large"
                      className={classes.tertiaryFab}
                    >
                      <DeleteForeverIcon />
                    </Fab>
                    <Button
                      onClick={() => {
                        this.saveChanges(updateBook);
                        this.props.history.push(`/books`);
                      }}
                      color="secondary"
                      variant="outlined"
                      size="large"
                      className={classes.secondaryFab}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        this.saveChanges(updateBook);
                      }}
                      color="secondary"
                      variant="contained"
                      size="large"
                      className={classes.fab}
                    >
                      Save
                    </Button>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default graphql(updateBookMutation)(withStyles(styles)(Book));
