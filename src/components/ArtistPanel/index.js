import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Icon, Badge } from 'react-fidelity-ui';
import './index.css';

const ArtistPanel = ({ artist, avatarSize }) => {
  const { id, name, followers, genres, images } = artist;
  const [firstImage] = images;

  return (
    <Card className="artist">
      <Link
        to={`/artists/${id}/albums`}
        style={{ textDecoration: 'none' }}
      >
        <div className="artist__wrap">
          <div className="artist__image">
            <Image
              src={firstImage.url}
              size={avatarSize}
              spinner={<Icon id="ion-load-c" spinning />}
            />
          </div>

          <div className="artist__body">
            <h3 className="artist__title">
              {name}
            </h3>

            <div className="artist__meta">
              <div>
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    size="md"
                    className="mr-1 mb-1"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <div>
                <strong>{followers.total}</strong>
                {' '}
                Followers
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
};

ArtistPanel.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    followers: PropTypes.shape({
      total: PropTypes.number
    }),
    genres: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string
      })
    )
  }).isRequired,
  avatarSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl'])
};

ArtistPanel.defaultProps = {
  avatarSize: 'md'
};

export default ArtistPanel;
