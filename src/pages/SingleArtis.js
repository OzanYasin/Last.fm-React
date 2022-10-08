import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';

const TOP_ALBUM_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=29a080980b034e8c18685f697014f77c&format=json`;

const TOP_TRACKS_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=29a080980b034e8c18685f697014f77c&format=json`;

const SingleArtist = () => {
  return (
    <div>
      <h2>single artist page </h2>
    </div>
  );
};

export default SingleArtist;
