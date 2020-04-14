import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid, Layout } from 'react-fidelity-ui';
import PageLayout from '../components/PageLayout';
import PageSpinner from '../components/PageSpinner';
import ArtistPanel from '../components/ArtistPanel';
import ArtistAlbumPanel from '../components/ArtistAlbumPanel';
import { getAccessToken, login, getArtist, getArtistAlbums } from '../spotifyApi';

const { Row, Col } = Grid;

const ArtistAlbumSongs = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);

  const fetchArtist = () => {
    return getArtist(artistId)
      .then((nextArtist) => {
        setArtist(nextArtist);
        setLoadingArtist(false);
      })
      .catch(() => {
        setLoadingArtist(false);
      })
  };

  const fetchArtistAlbums = () => {
    setLoadingAlbums(true);

    return getArtistAlbums(artistId)
      .then((res) => {
        setArtistAlbums(res.items);
        setLoadingAlbums(false);
      })
      .catch(() => {
        setLoadingAlbums(false);
      })
  };

  // on change artistId
  useEffect(() => {
    setLoadingArtist(true);

    // check if already logged in
    if (!getAccessToken()) {
      // if not, login and then fetch the artist
      login().then(() => fetchArtist().then(() => fetchArtistAlbums()))
    } else {
      // else, just fetch the artist
      fetchArtist().then(() => fetchArtistAlbums());
    }
  }, [artistId]);

  // TODO: Adjust spinner

  return (
    <PageLayout>
      <Layout.Content>
        <Grid>
          <Row>
            <Col widths={['sm-12', 'md-3']}>
              <div
                style={{
                  position: 'sticky',
                  top: '6rem'
                }}
              >
                <h2>Artist</h2>

                {!loadingArtist && artist && (
                  <ArtistPanel
                    artist={artist}
                    avatarSize="lg"
                  />
                )}

                {/*{!loadingAlbum && album && (*/}
                {/*  <ArtistAlbumPanel*/}
                {/*    album={album}*/}
                {/*  />*/}
                {/*)}*/}
              </div>
            </Col>

            <Col widths={['sm-12', 'md-9']}>
              <h2>Album Songs</h2>

              {loadingAlbums ? (
                <PageSpinner />
              ) : (
                <Grid>
                  <Row>
                    ...
                  </Row>
                </Grid>
              )}
            </Col>
          </Row>
        </Grid>
      </Layout.Content>
    </PageLayout>
  );
};

export default ArtistAlbumSongs;
