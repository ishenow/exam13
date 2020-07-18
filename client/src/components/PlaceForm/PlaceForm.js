import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import FormElement from '../UI/Form/FormElement';

class PlaceForm extends Component {
  state = {
    title: '',
    desc: '',
    image: null,
    agree: false,
  };

  submitFormHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });

    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  fileChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  agreeHandler = event => {
    if (event.target.checked) {
      this.setState({ agree: true });
    } else {
      this.setState({ agree: false });
    }
  };

  getFieldError = fieldName => {
    return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
  };

  render() {
    return (
      <Fragment>
        {this.props.error && this.props.error.global && (
          <Alert color="danger">
            {this.props.error.global}
          </Alert>
        )}
        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            value={this.state.title}
            onChange={this.inputChangeHandler}
            type="text" title='Place name'
            propertyName='title'
            placeholder='Enter place name'
            error={this.getFieldError('title')}
            required={true}
          />

          <FormElement
            value={this.state.desc}
            onChange={this.inputChangeHandler}
            type="text" title='Place description'
            propertyName='desc'
            placeholder='Enter place description'
            error={this.getFieldError('desc')}
            required={true}
          />

          <FormElement
            propertyName="image"
            title="Image"
            type="file"
            onChange={this.fileChangeHandler}
            error={this.getFieldError('image')}
            required={true}
          />
          <FormGroup row>
            <Label check sm={6}>
              By submitting this form, you agree that the following information will be submitted to the public domain,
              and administrators of site will have full control over the said information.
            </Label>
            <Col sm={6}>
              <Input type="checkbox" onChange={this.agreeHandler} />{' '}
            </Col>
          </FormGroup>
          <Button type="submit" color="info">Create place</Button>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.places.error,
});

export default connect(mapStateToProps, null)(PlaceForm);
