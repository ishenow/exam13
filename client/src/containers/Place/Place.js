import React, { Component, Fragment } from 'react';
import { apiURL } from '../../constants';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Media } from 'reactstrap';
import Images from '../../components/Images/Images';
import GalleryForm from '../../components/GalleryForm/GalleryForm';
import { deleteGallery, getGallery } from '../../store/actions/galleryActions';
import { getPlace } from '../../store/actions/placesActions';
import Slider from 'react-slick';
import CommentForm from '../../components/CommentForm/CommentForm';
import { deleteComments, getComments } from '../../store/actions/commentsActions';
import StarRatings from 'react-star-ratings';

import './Place.css';


class Place extends Component {
  componentDidMount() {
    this.props.getPlace(this.props.match.params.id);
    this.props.getGallery(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  getTotalRating = () => {
    let totalQuality = 0;
    let totalService = 0;
    let totalInterior = 0;
    let overall = 0;

    this.props.comments.forEach(comment => {
      totalQuality += comment.quality / this.props.comments.length;
      totalService += comment.service / this.props.comments.length;
      totalInterior += comment.interior / this.props.comments.length;
    });

    overall = (totalQuality + totalService + totalInterior) / 3;
    return (
      <div className="recipe-total-rating">
        <div className="rating-row">
          <p className="rating-name">Overall: </p>
          <StarRatings
            starDimension='25px'
            rating={overall}
            starRatedColor="rgb(255, 140, 0)"
            numberOfStars={5}
            name="quick"
          />
          <p className="rating-count">{overall.toFixed(1)}</p>
        </div>
        <div className="rating-row">
          <p className="rating-name">Quality of food: </p>
          <StarRatings
            starDimension='25px'
            rating={totalQuality}
            starRatedColor="rgb(255, 140, 0)"
            numberOfStars={5}
            name="quick"
          />
          <p className="rating-count">{totalQuality.toFixed(1)}</p>
        </div>
        <div className="rating-row">
          <p className="rating-name">Service quality: </p>
          <StarRatings
            starDimension='25px'
            rating={totalService}
            starRatedColor="rgb(255, 140, 0)"
            numberOfStars={5}
            name="quick"
          />
          <p className="rating-count">{totalService.toFixed(1)}</p>
        </div>
        <div className="rating-row">
          <p className="rating-name">Interior: </p>
          <StarRatings
            starDimension='25px'
            rating={totalInterior}
            starRatedColor="rgb(255, 140, 0)"
            numberOfStars={5}
            name="quick"
          />
          <p className="rating-count">{totalInterior.toFixed(1)}</p>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.place === null) return null;

    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 100,
      slidesToShow: 3,
      slidesToScroll: 1,
    };


    return (
      <div className="place-block">
        <Media>
          <Media>
            <Images image={this.props.place.image} />
          </Media>
          <Media body>
            <Media heading>{this.props.place.title}</Media>
            {this.props.place.desc}
          </Media>
        </Media>
        <div className="place-average-rating">
          <h4 className="average-title">Ratings</h4>
          {this.getTotalRating()}
        </div>
        <div className="gallery-block">
          {this.props.user ?
            <GalleryForm place={this.props.match.params.id} /> : null
          }
          <Slider {...settings}>
            {
              this.props.gallery.map((slider, index) => (
                <Fragment key={index}>
                  <img className='Slide-img' src={apiURL + '/uploads/gallery/' + slider.gallery}
                       alt={this.props.place.title} />
                  {
                    this.props.user && this.props.user.role === 'admin' &&
                    <Button color="danger" className="delete-btn"
                            onClick={() => this.props.deleteGallery(slider._id, this.props.match.params.id)}>X</Button>
                  }
                </Fragment>
              ))
            }
          </Slider>
        </div>
        <div className="comments-block-wrapper">
          <div className="comments-inner">
            {this.props.comments.map(comment => {
              return (
                <div className="comment-block" key={comment._id}>
                  <h5>{comment.user.displayName}:</h5>
                  <div className="rating-block">
                    <FormGroup>
                      <Label>Quality of food: </Label>
                      <StarRatings
                        starDimension='25px'
                        rating={comment.quality}
                        starRatedColor="rgb(255, 140, 0)"
                        numberOfStars={5}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Service quality: </Label>
                      <StarRatings
                        starDimension='25px'
                        rating={comment.service}
                        starRatedColor="rgb(255, 140, 0)"
                        numberOfStars={5}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Interior: </Label>
                      <StarRatings
                        starDimension='25px'
                        rating={comment.interior}
                        starRatedColor="rgb(255, 140, 0)"
                        numberOfStars={5}
                      />
                    </FormGroup>
                  </div>
                  <p>{comment.comment}</p>
                  {
                    this.props.user && this.props.user.role === 'admin' &&
                    <Button
                      color="warning"
                      onClick={() => this.props.deleteComment(comment._id, this.props.match.params.id)}
                    >
                      Delete
                    </Button>
                  }
                </div>
              );
            })}
          </div>
          {!this.props.user ? null :
            (this.props.place.user && this.props.place.user._id) !== (this.props.user && this.props.user._id) ?
              <CommentForm place={this.props.match.params.id} /> : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  place: state.places.place,
  gallery: state.gallery.gallery,
  comments: state.comments.comments,
});

const mapDispatchToProps = dispatch => ({
  getPlace: (placeId) => dispatch(getPlace(placeId)),
  getGallery: (placeId) => dispatch(getGallery(placeId)),
  getComments: (placeId) => dispatch(getComments(placeId)),
  deleteComment: (commentId, placeId) => dispatch(deleteComments(commentId, placeId)),
  deleteGallery: (galleryId, placeId) => dispatch(deleteGallery(galleryId, placeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Place);
