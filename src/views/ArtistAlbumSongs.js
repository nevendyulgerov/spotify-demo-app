import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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
  const [artistAlbum, setArtistAlbum] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [loadingAlbum, setLoadingAlbum] = useState(false);

  const getUniqueAlbums = (albums) => {
    const albumsNameReleaseDate = [];

    return albums.filter(({ release_date, name }) => {
      const albumNameReleaseDate = `${name}:${release_date}`;
      const isUnique = !albumsNameReleaseDate.includes(albumNameReleaseDate);

      if (isUnique) {
        albumsNameReleaseDate.push(albumNameReleaseDate);
      }

      return isUnique;
    })
  };

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
        const uniqueAlbums = getUniqueAlbums(res.items);
        setArtistAlbums(uniqueAlbums);
        setLoadingAlbums(false);
      })
      .catch(() => {
        setLoadingAlbums(false);
      })
  };

  // on change artistId
  useEffect(() => {
    setLoadingArtist(true);

    if (!getAccessToken()) {
      login().then(() => {
        fetchArtist().then(() => {
          fetchArtistAlbums();
        });
      })
    } else {
      fetchArtist().then(() => {
        fetchArtistAlbums();
      });
    }
  }, [artistId]);

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

                <h3>Album</h3>

                {/*{!loadingAlbum && album && (*/}
                {/*  <ArtistAlbumPanel*/}
                {/*    album={album}*/}
                {/*    avatarSize="lg"*/}
                {/*  />*/}
                {/*)}*/}
              </div>
            </Col>

            <Col widths={['sm-12', 'md-9']}>
              <h2>Songs</h2>

              {loadingAlbums ? (
                <PageSpinner style={{ minHeight: 'calc(100vh - 15rem)' }} />
              ) : (
                <Grid>
                  <Row>
                    <Col>
                      Album songs
                    </Col>
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
