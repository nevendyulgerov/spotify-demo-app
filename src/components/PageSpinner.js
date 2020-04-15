import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-fidelity-ui';
import classNames from 'classnames';

const PageSpinner = (props) => {
  const className = classNames({
    'd-flex': true,
    'color--secondary': true,
    'align-items-center': true,
    'justify-content-center': true
  });

  return (
    <div
      {...props}
      className={className}
    >
      <Icon
        id="ion-load-c"
        size={52}
        spinning
      />
    </div>
  );
};

PageSpinner.propTypes = {
  [PropTypes.string]: PropTypes.any
};

export default PageSpinner;
