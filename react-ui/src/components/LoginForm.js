import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Row, Col, Input, Card, CardPanel, Button } from "react-materialize";

// import query from '../gql/queries/CurrentUser';
// import mutation from '../gql/mutations/Login';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  componentWillUpdate(nextProps) {
    // if (!this.props.data.user && nextProps.data.user) {
    //   this.props.history.push("/dashboard");
    // }
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("props", this.props);
    const { email, password } = this.state;

    // this.props.mutate({
    //   variables: { email, password },
    //   refetchQueries: [{ query }]
    // });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh"
        }}
      >
        <Col
          style={{
            display: "flex"
          }}
        >
          <Card
            style={{}}
            className="blue-grey darken-1"
            textClassName="white-text"
            title="Login"
            actions={[
              <Button waves="light" style={{ width: "80vw" }}>
                submit
              </Button>
            ]}
          >
            <Input type="email" label="Email" />
            <Input type="password" label="Password" />
          </Card>
        </Col>
        {/* <CardPanel className="teal lighten-4 black-text">
            <Input type="password" label="Password" s={12} />
            <Input type="email" label="Email" s={12} />

            <Button waves="light" style={{ float: "right" }}>
              submit
            </Button>
          </CardPanel> */}
        {/* <h3 className="section-title">Login</h3> */}

        {/* <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="email"
              value={this.state.email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
          </div>
          <button className="waves-effect waves-light right btn-medium outline">
            Submit
          </button>
        </form> */}
      </div>
    );
  }
}
export default LoginForm;
//export default graphql(query)(graphql(mutation)(LoginForm));
