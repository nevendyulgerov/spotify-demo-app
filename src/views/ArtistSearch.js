import React, { useState, useEffect } from 'react';
import { InputGroup, Search, Icon, Button } from 'react-fidelity-ui';
import PageLayout from '../components/PageLayout';
import PageSpinner from '../components/PageSpinner';
import ArtistPanel from '../components/ArtistPanel';
import { login, getArtist } from '../spotifyApi';

const ArtistSearch = () => {
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [artist, setArtist] = useState(null);

  const onChange = ({ target }) => {
    setSearch(target.value);
  };

  const onSearchArtist = () => {
    setSearching(true);

    getArtist(search)
      .then((nextArtist) => {
        setSearching(false);
        setArtist(nextArtist);
      })
      .catch((err) => {
        setSearching(false);
      });
  };

  // on mount
  useEffect(() => {
    // log into spotify using client id and secret
    setLoggingIn(true);
    login()
      .then(() => setLoggingIn(false))
      .catch(() => setLoggingIn(false));
  }, []);

  return (
    <PageLayout>
      {loggingIn ? (
        <PageSpinner />
      ) : (
        <div>
          <InputGroup
            className="mt-2"
            isRow
          >
            <Search
              value={search}
              placeholder="Search for artists..."
              disabled={loggingIn}
              onChange={onChange}
              icon={<Icon id="ion-android-person" />}
            />

            <Button
              loading={searching}
              onClick={onSearchArtist}
            >
              Search
            </Button>
          </InputGroup>

          {artist && (
            <ArtistPanel
              artist={artist}
              avatarSize="xl"
            />
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default ArtistSearch;
