import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Icon } from 'react-fidelity-ui';
import classNames from 'classnames';
import logo from '../assets/spotify-logo.svg';

const AppLogo = ({ alignCenter, justifyCenter }) => {
  const linkClassName = classNames({
    'd-flex': true,
    'color--secondary': true,
    'align-items-center': alignCenter,
    'justify-content-center': justifyCenter
  });

  return (
    <span className="h2 mb-0">
      <Link
        to="/"
        className={linkClassName}
      >
        <Image
          src={logo}
          size="md"
          alt="logo"
          className="bg--white mr-1"
          spinner={(
            <Icon
              id="ion-load-c"
              className="color--secondary"
              spinning
            />
          )}
        />
        Spotify Demo App
      </Link>
    </span>
  );
};

AppLogo.propTypes = {
  alignCenter: PropTypes.bool,
  justifyCenter: PropTypes.bool
};

AppLogo.defaultProps = {
  alignCenter: true,
  justifyCenter: true
};

export default AppLogo;
