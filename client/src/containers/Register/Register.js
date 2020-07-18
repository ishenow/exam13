import React, { Component, Fragment } from 'react';
import { Alert, Button, Col, Form, FormGroup } from 'reactstrap';
import { registerUser } from '../../store/actions/userActions';
import { connect } from 'react-redux';
import FormElement from '../../components/UI/Form/FormElement';

class Register extends Component {
  state = {
    username: '',
    password: '',
    displayName: '',
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitFormHandler = event => {
    event.preventDefault();

    this.props.registerUser({ ...this.state });
  };

  getFieldError = fieldName => {
    return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
  };

  render() {
    return (
      <Fragment>
        <h2>Register new user</h2>
        {this.props.error && this.props.error.global && (
          <Alert color="danger">
            {this.props.error.global}
          </Alert>
        )}

        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="username"
            title="Username"
            type="text"
            value={this.state.username}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('username')}
            placeholder="Enter your desired username"
            autoComplete='new-username'
          />

          <FormElement
            propertyName="password"
            title="Password"
            type="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
            error={this.getFieldError('password')}
            placeholder="Enter your secure password"
            autoComplete='new-password'
          />

          <FormElement
            propertyName="displayName"
            title="Your name"
            type="text"
            value={this.state.displayName}
            onChange={this.inputChangeHandler}
            placeholder="Enter your first and last name"
          />


          <FormGroup row>
            <Col sm={{ offset: 2, size: 10 }}>
              <Button type="submit" color="primary">
                Register
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.users.registerError,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
