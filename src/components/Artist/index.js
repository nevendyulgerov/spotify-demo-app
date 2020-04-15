import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon, Badge } from 'react-fidelity-ui';
import { isObj } from '../../utils';
import './index.css';

const Artist = ({ artist, avatarSize }) => {
  const { name, followers, genres, images } = artist;
  const [firstImage] = images;

  return (
    <Card className="artist">
      <div className="artist__wrap">
        {isObj(firstImage) && (
          <div className="artist__image">
            <Image
              src={firstImage.url}
              size={avatarSize}
              spinner={<Icon id="ion-load-c" spinning />}
            />
          </div>
        )}

        <div className="artist__body">
          <h3 className="artist__title">
            {name}
          </h3>

          <div className="artist__meta">
            <div className="artist__meta__item">
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

            <div className="artist__meta__item">
              <strong>{followers.total}</strong>
              {' '}
              Followers
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
};

Artist.propTypes = {
  artist: PropTypes.shape({
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

Artist.defaultProps = {
  avatarSize: 'md'
};

export default Artist;
