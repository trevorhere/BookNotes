import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1
  }
};

function Loading(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div>
        <LinearProgress color="secondary" />
      </div>
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
