import React, { useState, useEffect, useRef } from 'react';
import { InputGroup, Search, Icon, Button, Notification } from 'react-fidelity-ui';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageSpinner from '../components/PageSpinner';
import Artist from '../components/Artist';
import { login, getArtist } from '../spotifyApi';
import { capitalize } from '../utils';

const ArtistSearch = () => {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [artist, setArtist] = useState(null);
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

    getArtist(search)
      .then((nextArtist) => {
        setArtist(nextArtist);
        setSearchError(null);
        setSearching(false);
      })
      .catch((err) => {
        const errorData = JSON.parse(err.responseText);
        setSearchError(errorData.error.message);
        setSearching(false);
      });
  };

  const logIntoSpotify = () => {
    setLoggingIn(true);

    login()
      .then(() => {
        setLoggingIn(false);
        focusSearchInput();
      })
      .catch(() => setLoggingIn(false));
  };

  // on mount
  useEffect(() => {
    logIntoSpotify();
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
          ) : artist && (
            <Link
              to={`/artists/${artist.id}/albums`}
              style={{ textDecoration: 'none' }}
            >
              <Artist
                artist={artist}
                avatarSize="xl"
              />
            </Link>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default ArtistSearch;
