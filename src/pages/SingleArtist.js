import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
import DetailCard from '../components/DetailCard';

const TOP_ALBUM_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=29a080980b034e8c18685f697014f77c&format=json&limit=5&artist=`;

const TOP_TRACKS_URL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&api_key=29a080980b034e8c18685f697014f77c&format=json&limit=5&artist=`;

const SingleArtist = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

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
  }, [URL_NAME]);

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
            const { name, playcount: playCount, listeners, image } = item;
            return { name, playCount, listeners, image };
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
  }, [URL_NAME]);

  if (loading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className="container">
        <section className="topalbums">
          <h2 className="section-title">top albums</h2>
          <div className="artists-card">
            {albums.map((album, i) => {
              return <DetailCard key={i} {...album} />;
            })}
          </div>
        </section>
        <br />
        <section className="toptracks">
          <h2 className="section-title">top tracks</h2>
          <div className="artists-card">
            {tracks.map((track, i) => {
              return <DetailCard key={i} {...track} />;
            })}
          </div>
        </section>
      </div>
      <div className="btn-container">
        <div className="homebutton">
          <Link to="/" className="btn btn-primary">
            Back To Home →
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleArtist;
