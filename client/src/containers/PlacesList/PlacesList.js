import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardTitle, NavLink } from 'reactstrap';
import Images from '../../components/Images/Images';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { deletePlace, getPlaces } from '../../store/actions/placesActions';

import './PlacesList.css';


class PlacesList extends Component {
  componentDidMount() {
    this.props.getPlaces();
  }

  render() {
    let placeCard = null;
    if (this.props.places) {
      placeCard = this.props.places.map(place => {
        return (
          <Card key={place._id}>
            <NavLink tag={RouterNavLink} to={`/place/${place._id}`}>
              <Images image={place.image} />
            </NavLink>
            <CardBody>
              <CardTitle>{place.title}</CardTitle>
            </CardBody>
            <CardFooter>
              {
                this.props.user && this.props.user.role === 'admin' &&
                <Button color="danger" onClick={() => this.props.deletePlace(place._id)}>Delete</Button>
              }
            </CardFooter>
          </Card>
        );
      });
    }
    return (
      <div className="places-list">
        {placeCard}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  places: state.places.places,
});

const mapDispatchToProps = dispatch => ({
  getPlaces: () => dispatch(getPlaces()),
  deletePlace: (placeId) => dispatch(deletePlace(placeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);
