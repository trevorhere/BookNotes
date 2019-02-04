import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1
    // height: "80vh",
    // alignItems: "center",
    // justifyContent: "center",
    // textAlign: "center"
  },
  line: {
    // margin: "0 auto",
    // marginTop: "50vh",
    // width: 100,
    // bottom: 0,
    // display: "flex",
    // alignSelf: "center",
    // justifyContent: "center"
  }
};

function Loading(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div>
        <LinearProgress className={classes.line} color="secondary" />
      </div>
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// const componentStyle = css`
//   height: 80vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: ;center;
// `;

// class Loading extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className={componentStyle}>
//         <BarLoader
//           manLoader
//           className={override}
//           sizeUnit={"px"}
//           size={20}
//           color={"secondary"}
//           loading={this.props.loading}
//         />
//       </div>
//     );
//   }
// }

// export default Loading;
