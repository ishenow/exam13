import React, { Component } from 'react';
import { commentsCreate } from '../../store/actions/commentsActions';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import './CommentForm.css';

class CommentForm extends Component {
  state = {
    comment: '',
    quality: 5,
    service: 5,
    interior: 5,
    place: this.props.place,
  };

  changeRating = (newRating, name) => {
    this.setState({
      [name]: newRating,
    });
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitRating = () => {
    this.props.commentsCreate({ ...this.state });
    this.state.comment = '';
    console.log(this.state);
  };

  render() {
    return (
      <div className="comments-block">
        <h4>Add review</h4>
        <Form onSubmit={this.submitRating}>
          <div className="rating-block">
            <FormGroup>
              <Label>Quality of food: </Label>
              <StarRatings
                rating={this.state.quality}
                starDimension='25px'
                starRatedColor="rgb(255, 140, 0)"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="quality"
              />
            </FormGroup>
            <FormGroup>
              <Label>Service quality: </Label>
              <StarRatings
                rating={this.state.service}
                starDimension='25px'
                starRatedColor="rgb(255, 140, 0)"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="service"
              />
            </FormGroup>
            <FormGroup>
              <Label>Interior: </Label>
              <StarRatings
                rating={this.state.interior}
                starDimension='25px'
                starRatedColor="rgb(255, 140, 0)"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="interior"
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Input type="textarea" name="comment" onChange={this.inputChangeHandler} value={this.state.comment} />
          </FormGroup>
        </Form>
        <Button type="submit" color="info" onClick={this.submitRating}>Submit new review</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  commentsCreate: (commentData) => dispatch(commentsCreate(commentData)),
});

export default connect(null, mapDispatchToProps)(CommentForm);
