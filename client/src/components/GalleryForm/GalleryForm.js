import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { addImage } from '../../store/actions/galleryActions';

import './GalleryForm.css';

class GalleryForm extends Component {
  state = {
    place: this.props.place,
    gallery: [],
  };

  galleryChangeHandler = event => {
    event.preventDefault();

    let files = Array.from(event.target.files);

    files.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          gallery: [...this.state.gallery, file],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < this.state.gallery.length; i++) {
      formData.append('gallery', this.state.gallery[i]);
    }

    formData.append('place', this.state.place);

    this.props.addImage(formData, this.state.place);
  };

  render() {
    return (
      <Form className="gallery-form">
        <FormGroup row>
          <Label for="gallery" sm={2}>Add new photo</Label>
          <Col sm={10}>
            <Input
              type="file"
              name="gallery" id="gallery"
              onChange={this.galleryChangeHandler}
            />
          </Col>
        </FormGroup>
        <Button type="submit" color='info' onClick={this.submitFormHandler}>Upload</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addImage: (imageData, placeId) => dispatch(addImage(imageData, placeId)),
});

export default connect(null, mapDispatchToProps)(GalleryForm);
