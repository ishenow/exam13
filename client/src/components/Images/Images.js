import React from 'react';
import { CardImg } from 'reactstrap';


const Images = props => {
  let image = null;
  if (props.image) {
    image = 'http://localhost:8000/uploads/' + props.image;
    return <CardImg src={image} className="img-thumbnail" alt="Place" />;
  }
  return null;
};

export default Images;
