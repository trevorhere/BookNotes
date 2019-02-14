import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

// The `withStyles()` higher-order component is injecting a `classes`
// property that is used by the `Button` component.
const StyledDialog = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  }
})(Dialog);

export default function ClassesShorthand() {
  return <StyledDialog>Classes Shorthand</StyledDialog>;
}
