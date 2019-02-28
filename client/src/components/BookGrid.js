import React, { Component } from "react";
import PropTypes from "prop-types";
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
import FilterIcon from "@material-ui/icons/FilterList";

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
  media: {
    minHeight: 300,
    minWidth: 100,
    backgroundSize: "cover",
    backgroundColor: "#000"
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
  cardField: {
    color: "white !important"
  },
  menuCard: {
    backgroundColor: "#0d0e0f !important",
    marginLeft: "2%",
    minWidth: 40,
    top: "auto",
    left: 60,
    bottom: 20,
    right: "auto",
    position: "fixed",
    zIndex: 1500
  },
  menuCardButton: {
    marginLeft: 15
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
  leftFab: {
    backgroundColor: "primary",
    margin: 0,
    top: "auto",
    left: 20,
    bottom: 20,
    right: "auto",
    position: "fixed"
  }
};

class BookGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      filteredBooks: [],
      sort: "none",
      menu: false
    };
  }

  componentDidMount() {
    const { books, sort } = this.props;
    this.setState({
      books,
      filteredBooks: books,
      sort
    });
  }

  handleMenu = () => {
    console.log("menu:", this.state.menu);
    this.setState({ menu: !this.state.menu });
  };
  sort(code) {
    const { books } = this.state;
    let filter = [...books];
    switch (code) {
      case "alphabetical":
        console.log("filter", filter);
        console.log("test a");
        filter.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
        this.setState({
          filteredBooks: filter
        });
        break;

      case "reverseAlphabetical":
        console.log("test r");
        filter.sort((b, a) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
        this.setState({
          filteredBooks: filter
        });
        break;
      default:
        console.log("test n");
        this.setState({
          filteredBooks: books
        });
        break;
    }
  }

  searchForBook(event, value) {
    event.preventDefault();

    let updatedList = this.state.books;
    updatedList = updatedList.filter(book => {
      return book.title.toLowerCase().search(value.toLowerCase()) !== -1;
    });

    this.setState({
      filteredBooks: updatedList
    });
  }

  renderMenu = () => {
    const { classes } = this.props;
    return (
      <Card className={classes.menuCard}>
        <CardContent>
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
          />
          <Button
            onClick={() => {
              this.sort("alphabetical");
            }}
            color="secondary"
            variant="outlined"
            size="large"
            className={classes.menuCardButton}
          >
            A - Z
          </Button>
          <Button
            onClick={() => {
              this.sort("reverseAlphabetical");
            }}
            color="secondary"
            variant="outlined"
            size="large"
            className={classes.menuCardButton}
          >
            Z - A
          </Button>
          <Button
            onClick={() => {
              console.log("sortsort", this.state.sort);

              this.sort("none");
            }}
            color="secondary"
            variant="outlined"
            size="large"
            className={classes.menuCardButton}
          >
            X
          </Button>
        </CardContent>
      </Card>
    );
  };

  renderBookCard(books) {
    const { classes } = this.props;

    // console.log("books sort", books);

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
                title={book.title}
              />
            </CardActionArea>
          </Card>
        );
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { books, filteredBooks } = this.state;
    // console.log("book grid", this.props);
    return (
      <div className={classes.root}>
        {this.state.menu ? this.renderMenu() : <div />}
        {/* {this.renderMenu()} */}
        <Grid container className={classes.Grid} spacing={24}>
          {this.renderBookCard(filteredBooks)}
        </Grid>
        <Fab
          color="secondary"
          aria-label="Add"
          onClick={() => {
            this.handleMenu();
          }}
          className={classes.leftFab}
        >
          <FilterIcon />
        </Fab>
      </div>
    );
  }
}

BookGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookGrid);
