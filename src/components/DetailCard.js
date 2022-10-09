import React from 'react';
import SingleArtist from '../pages/SingleArtis';

const DetailCard = ({ name, playCount, image, listener }) => {
  return (
    <section className="section artist-section">
      <h2 className="section-title">{name}</h2>
      <div className="album">
        <div className="album-info">
          <p>
            <span className="album-data">playcount :</span>
            12312312
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
