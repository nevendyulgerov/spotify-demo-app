import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-fidelity-ui';
import './index.css';

const ArtistAlbum = ({ album }) => {
  const { name, images, release_date, total_tracks } = album;
  const [firstImage] = images;

  return (
    <Card padded={false}>
      <div className="album__wrap">
        <div className="album__image">
          <Image
            aspectRatio="16-9"
            src={firstImage.url}
            rounded={false}
            expanded
          />
        </div>

        <div className="album__body">
          <h3 className="h4 album__title">
            {name}
          </h3>

          <div className="album__meta">
            <div className="album__meta__item">
              Released:
              {' '}
              <strong>{release_date}</strong>
            </div>

            <div className="album__meta__item">
              Total tracks:
              {' '}
              <strong>{total_tracks}</strong>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
};

ArtistAlbum.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string
      })
    ),
    release_date: PropTypes.string,
    total_tracks: PropTypes.number
  }).isRequired
};

export default ArtistAlbum;
