import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PlaceForm from '../../components/PlaceForm/PlaceForm';
import { placeCreate } from '../../store/actions/placesActions';

class AddPlace extends Component {
  createPlace = placeData => {
    this.props.createPlace(placeData);
  };

  render() {
    return (
      <div className="new-photo-form">
        <Container>
          <h4>Add new place</h4>
          <PlaceForm
            onSubmit={this.createPlace}
          />
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPlace: placeData => dispatch(placeCreate(placeData)),
});

export default connect(null, mapDispatchToProps)(AddPlace);
