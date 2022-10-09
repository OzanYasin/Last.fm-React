import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import DetailCard from '../components/DetailCard';
import { useGlobalContext } from '../context';

const TOP_ALBUM_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=29a080980b034e8c18685f697014f77c&format=json&limit=3&artist=`;

const TOP_TRACKS_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=29a080980b034e8c18685f697014f77c&format=json&limit=3&artist=`;

const SingleArtist = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  // console.log(album);
  const { fetchTopAlbums } = useGlobalContext();

  const URL_NAME = id.replace(' ', '');

  useEffect(() => {
    async function getAlbums() {
      setLoading(true);
      try {
        const response = await fetch(`${TOP_ALBUM_URL}${URL_NAME}`);
        const data = await response.json();
        // console.log(data);
        if (data) {
          const albumsList = data.topalbums.album;
          const newAlbum = albumsList.map((item) => {
            const { name, playcount: playCount, image } = item;
            return { name, playCount, image };
          });
          setAlbums(newAlbum);
        } else {
          setAlbums(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getAlbums();
  }, []);

  useEffect(() => {
    async function getTracks() {
      setLoading(true);
      try {
        const response = await fetch(`${TOP_TRACKS_URL}${URL_NAME}`);
        const data = await response.json();
        // console.log(data);
        if (data) {
          const tracksList = data.toptracks.track;
          const newTrack = tracksList.map((item) => {
            const { name, playcount: playCount, listener, image } = item;
            return { name, playCount, listener, image };
          });
          setTracks(newTrack);
        } else {
          setAlbums(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getTracks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section">
      <h2 className="section-title">top albums</h2>
      <div className="artists-center">
        {albums.map((album, i) => {
          return <DetailCard key={i} {...album} />;
        })}
      </div>
      <div className="artists-center">
        {tracks.map((track, i) => {
          return <DetailCard key={i} {...track} />;
        })}
      </div>
      <Link to="/" className="btn btn-primary">
        top artists
      </Link>
    </section>
  );
};

export default SingleArtist;
