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

const ArtistAlbums = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(false);

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
              </div>
            </Col>

            <Col widths={['sm-12', 'md-9']}>
              <h2>Albums</h2>

              {loadingAlbums ? (
                <PageSpinner style={{ minHeight: 'calc(100vh - 15rem)' }} />
              ) : (
                <Grid>
                  <Row>
                    {artistAlbums.map((album) => (
                      <Col
                        key={album.id}
                        widths={['md-12', 'lg-6']}
                      >
                        <Link
                          to={`/artists/${artistId}/albums/${album.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <ArtistAlbumPanel album={album} />
                        </Link>
                      </Col>
                    ))}
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

export default ArtistAlbums;
