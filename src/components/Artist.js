import React from 'react';
import { Link } from 'react-router-dom';

const Artist = ({ name, playCount, listeners, image }) => {
  let artistImage = image[3]['#text'];

  return (
    <article className="artist">
      <div className="img-container">
        <img src={artistImage} alt={name} />
      </div>
      <div className="artist-footer">
        <h3>{name}</h3>
        <h4>Play Count: {playCount}</h4>
        <h4>Listener: {listeners}</h4>
        <Link to={`/artist/${name}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Artist;
