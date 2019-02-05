import React, { Component } from "react";
import { graphql, compose, Mutation, Query } from "react-apollo";
import fetchBook from "../gql/queries/fetchBook";
import updateBookMutation from "../gql/mutations/UpdateBook";
import { Editor } from "react-draft-wysiwyg";
import Loading from "./Loading";

import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  createWithContent
} from "draft-js";
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
  withStyles
} from "@material-ui/core";
import { Add, Save } from "@material-ui/icons";

const styles = {
  root: {
    padding: "2%",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: 250,
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
    padding: 10
  },
  quill: {
    height: "100%"
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
      loaded: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleChange(value) {
    this.setState({ text: value });
  }

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
  };

  testSetText() {
    this.setState({
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.state.json))
      )
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  initializeEditorText(notes) {
    if (notes) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(notes))
        )
      });
    }
  }

  render() {
    const { classes, match } = this.props;
    const { editorState } = this.state;

    return (
      <Query
        query={fetchBook}
        errorPolicy="ignore"
        fetchPolicy="cache-and-network"
        variables={{ bookID: this.props.match.params.bookID }}
        onCompleted={data => {
          console.log("data", data);
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
        {({ loading, error, data }) => {
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
                    <Grid container className={classes.Grid} spacing={24}>
                      <Grid
                        className={classes.innerGrid}
                        item
                        lg={2}
                        md={1}
                        xs={12}
                      >
                        <Card className={classes.card}>
                          <CardActionArea>
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
                              <Typography component="p">
                                {book.author}
                              </Typography>
                              <Typography component="p">
                                Added: {book.createdAt}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                      <Grid
                        className={classes.innerGrid}
                        item
                        lg={4}
                        md={11}
                        xs={12}
                      >
                        <Paper className={classes.paper}>
                          <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={this.onEditorStateChange}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                    <Button
                      onClick={() => {
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

export default withStyles(styles)(Book);
