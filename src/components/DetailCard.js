import React from 'react';
import SingleArtist from '../pages/SingleArtist';

const DetailCard = ({ name, playCount, image, listeners }) => {
  const artistImage = image[3]['#text'];

  return (
    <section className="section artist-section">
      <div className="card">
        <h2 className="card_title">{name}</h2>
        <div className="card_image">
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
      </div>
    </section>
  );
};

export default DetailCard;
