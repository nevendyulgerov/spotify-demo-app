import React, { useState, useEffect, useRef } from 'react';
import { Grid, InputGroup, Search, Icon, Button, Notification } from 'react-fidelity-ui';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageSpinner from '../components/PageSpinner';
import Artist from '../components/Artist';
import { login, searchArtists } from '../spotifyApi';
import { capitalize } from '../utils';

const { Row, Col } = Grid;

const ArtistSearch = () => {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [artists, setArtists] = useState([]);
  const refComponent = useRef(null);

  const onChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const onKeyDownSearch = ({ key }) => {
    if (key === 'Enter') {
      onSearchArtist();
    }
  };

  const focusSearchInput = () => {
    refComponent.current.querySelector('input').focus();
  };

  const onSearchArtist = () => {
    setSearching(true);

    searchArtists(search)
      .then((res) => {
        const { items } = res.artists;
        setArtists(items);
        setSearchError(null);
        setSearching(false);
      })
      .catch((err) => {
        const errorData = JSON.parse(err.responseText);
        setSearchError(errorData.error.message);
        setSearching(false);
      });
  };

  // on mount
  useEffect(() => {
    setLoggingIn(true);

    login()
      .then(() => {
        setLoggingIn(false);
        focusSearchInput();
      })
      .catch(() => setLoggingIn(false));
  }, []);

  return (
    <PageLayout>
      {loggingIn ? (
        <PageSpinner style={{ minHeight: 'calc(100vh - 5rem)' }} />
      ) : (
        <div ref={refComponent}>
          <InputGroup
            className="mt-2"
            isRow
          >
            <Search
              value={search}
              placeholder="Search for artists..."
              disabled={loggingIn}
              onChange={onChangeSearch}
              onKeyDown={onKeyDownSearch}
              icon={<Icon id="ion-android-person" />}
            />

            <Button
              loading={searching}
              onClick={onSearchArtist}
            >
              Search
            </Button>
          </InputGroup>

          {searchError ? (
            <Notification type="danger">
              {capitalize(searchError)}
            </Notification>
          ) : artists.length > 0 && (
            <Grid>
              <Row>
                {artists.map((artist) => (
                  <Col
                    key={artist.id}
                    widths={['md-12', 'lg-6']}
                  >
                    <Link
                      to={`/artists/${artist.id}/albums`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Artist
                        artist={artist}
                        avatarSize="xl"
                      />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Grid>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default ArtistSearch;
