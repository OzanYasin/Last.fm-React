import React from 'react';
import Artist from './Artist';
import Loading from './Loading';
import { useEffect } from 'react';
import { useGlobalContext } from '../context';

const ArtistList = () => {
  const { artists, loading, fetchTopArtists } = useGlobalContext();

  useEffect(() => {
    fetchTopArtists();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section">
      <h2 className="section-title">top artists</h2>
      <div className="artists-center">
        {artists.map((artist, i) => {
          return <Artist key={i} {...artist} />;
        })}
      </div>
    </section>
  );
};

export default ArtistList;
