import React, { Component } from "react";
import background from "../assets/city.jpeg";
import { BarLoader } from "react-spinners";
import { Col, Row, Preloader } from "react-materialize";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const componentStyle = {
  background: `linear-gradient(rgba(20,20,20, .75), rgba(20,20,20, .75)),url(${background})`,
  height: "96vh",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
};
const headerStyle = {};
const titleStyle = {
  color: "#ED6E72",
  fontSize: "64px",
  fontWeight: "100"
};
const subtitleStyle = {
  color: "#ED6E72",
  fontSize: "24px",
  width: "60vw"
};

class HomePage extends Component {
  render() {
    return (
      <div style={componentStyle}>
        {console.log("homepage", this.props)}
        <div style={headerStyle}>
          <h3 style={titleStyle}>W E L C O M E</h3>
          <Row>
            <Col s={12}>
              <Preloader size="small" color="red" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default HomePage;
