import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid, Layout } from 'react-fidelity-ui';
import PageLayout from '../components/PageLayout';
import PageSpinner from '../components/PageSpinner';
import Album from '../components/Album';
import Track from '../components/Track';
import { getAccessToken, login, getAlbum } from '../spotifyApi';

const { Row, Col } = Grid;

const AlbumTracks = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loadingAlbum, setLoadingAlbum] = useState(false);

  const fetchAlbum = () => {
    setLoadingAlbum(true);

    getAlbum(albumId)
      .then((res) => {
        setAlbum(res);
        setLoadingAlbum(false);
      })
      .catch(() => {
        setLoadingAlbum(false);
      })
  };

  // on change albumId
  useEffect(() => {
    setLoadingAlbum(true);

    if (!getAccessToken()) {
      login().then(fetchAlbum)
    } else {
      fetchAlbum();
    }
  }, [albumId]);

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
                <h2>Album</h2>

                {!loadingAlbum && album && (
                  <Album
                    album={album}
                    showArtist
                    avatarSize="lg"
                  />
                )}
              </div>
            </Col>

            <Col widths={['sm-12', 'md-9']}>
              <h2>Tracks</h2>

              {loadingAlbum ? (
                <PageSpinner style={{ minHeight: 'calc(100vh - 15rem)' }} />
              ) : album && (
                <>
                  {album.tracks.items.map((track) => (
                    <a
                      key={track.id}
                      href={track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Track track={track} />
                    </a>
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Grid>
      </Layout.Content>
    </PageLayout>
  );
};

export default AlbumTracks;
