import React, { Component, Fragment } from 'react';
import { Alert, Button, Col, Form, FormGroup } from 'reactstrap';
import FormElement from '../../components/UI/Form/FormElement';
import { loginUser } from '../../store/actions/userActions';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.loginUser({ ...this.state });
  };

  render() {
    return (
      <Fragment>
        <h2>Login</h2>
        {this.props.error && (
          <Alert color="danger">
            {this.props.error.error || this.props.error.global}
          </Alert>
        )}
        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="username"
            title="Username"
            type="text"
            value={this.state.username}
            onChange={this.inputChangeHandler}
            placeholder="Enter username you registered with"
            autoComplete='current-username'
          />

          <FormElement
            propertyName="password"
            title="Password"
            type="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
            placeholder="Enter password"
            autoComplete='current-password'
          />

          <FormGroup row>
            <Col sm={{ offset: 2, size: 10 }}>
              <Button type="submit" color="primary">
                Login
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.loginError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
