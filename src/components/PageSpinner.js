import React from 'react';
import { Icon } from 'react-fidelity-ui';
import classNames from 'classnames';

const PageSpinner = () => {
  const className = classNames({
    'd-flex': true,
    'color--secondary': true,
    'align-items-center': true,
    'justify-content-center': true
  });

  return (
    <div
      className={className}
      style={{ minHeight: 'calc(100vh - 5rem)' }}
    >
      <Icon
        id="ion-load-c"
        size={52}
        spinning
      />
    </div>
  );
};

export default PageSpinner;
