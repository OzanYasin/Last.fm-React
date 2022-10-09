import React from 'react';
import SingleArtist from '../pages/SingleArtis';

const DetailCard = ({ name, playCount, image, listeners }) => {
  const artistImage = image[3]['#text'];

  return (
    <section className="section artist-section">
      <h2 className="section-title">{name}</h2>
      <div className="">
        <img src={artistImage} alt={name} />
        <div className="album-info">
          <p>
            <span className="album-data">playcount:</span>
            {playCount}
          </p>
          {listeners ? (
            <p>
              <span className="album-data">listeners:</span>
              {listeners}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
