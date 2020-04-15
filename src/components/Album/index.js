import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Badge } from 'react-fidelity-ui';
import './index.css';

const Album = ({ album, showArtist }) => {
  const { name, images, release_date, total_tracks, artists } = album;
  const [firstImage] = images;
  const [firstArtist] = artists;

  return (
    <Card padded={false}>
      <div className="album__wrap">
        <div className="album__image">
          <Image
            aspectRatio="16-9"
            src={firstImage.url}
            rounded={false}
            expanded
            spinner={<Icon id="ion-load-c" spinning />}
          />
        </div>

        <div className="album__body">
          <h3 className="h4 album__title">
            {name}
          </h3>

          {showArtist && (
            <div className="album__artist">
              <Link to={`/artists/${firstArtist.id}/albums`}>
                <Badge size="md">
                  Artist: {firstArtist.name}
                </Badge>
              </Link>
            </div>
          )}

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

Album.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string
      })
    ),
    release_date: PropTypes.string,
    total_tracks: PropTypes.number,
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    )
  }).isRequired,
  showArtist: PropTypes.bool
};

Album.defaultProps = {
  showArtist: false
};

export default Album;
