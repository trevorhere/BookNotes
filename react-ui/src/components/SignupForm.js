import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Row, Input, Button } from "react-materialize";

// import query from '../gql/queries/CurrentUser';
// import mutation from '../gql/mutations/Login';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    return (
      <div style={{ color: "#9D9C9D" }} className="container">
        <h3 className="section-title">Signup</h3>
        <Row>
          <Input type="password" label="Password" s={12} />
          <Input type="email" label="Email" s={12} />
          <Button waves="light" style={{ float: "right" }}>
            submit
          </Button>
        </Row>

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
export default SignupForm;
//export default graphql(query)(graphql(mutation)(LoginForm));
