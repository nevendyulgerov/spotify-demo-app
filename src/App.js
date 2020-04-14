import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { App as UiApp } from 'react-fidelity-ui';
import ArtistSearch from './views/ArtistSearch';
import ArtistAlbums from './views/ArtistAlbums';
import ArtistMusic from './views/ArtistMusic';
import iconsSprite from './assets/ionicons-sprite.svg';
import 'react-fidelity-ui/dist/index.css';
import './App.css';

const App = () => (
  <UiApp iconsSprite={iconsSprite}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
        >
          <ArtistSearch />
        </Route>

        <Route path="/artists/:artistId/albums">
          <ArtistAlbums />
        </Route>

        <Route path="/artists/:artistId/albums/:albumId">
          <ArtistMusic />
        </Route>
      </Switch>
    </BrowserRouter>
  </UiApp>
);

export default App;
