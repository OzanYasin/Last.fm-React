import React from 'react';
import Artist from './Artist';
import Loading from './Loading';
import { useEffect } from 'react';
import { useGlobalContext } from '../context';

const ArtistList = () => {
  const { artists, loading, fetchTopArtists } = useGlobalContext();
  // Sorun
  // fetchTopArtists dependency olarak belirlenirse infitine loop meydana gelir. Cunku fetchleme islemini her bir bilgi icin yapicak ve ayni zamanda "artists" state'ini tekrar tekrar guncelleyecek.

  // Cozum
  // contex yapimizin icinde useCallback kullanabiliriz
  // Sadece bir sey degistiginde fetch methodunu gerceklestirmesini saglar.
  // Bu sayede dependency arayine fetchTopArtists methodunu ekleyebiliriz.

  useEffect(() => {
    fetchTopArtists();
  }, [fetchTopArtists]);

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
