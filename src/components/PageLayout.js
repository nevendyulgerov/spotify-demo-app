import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Layout } from 'react-fidelity-ui';
import AppLogo from './Logo';
import { isNonEmptyStr } from '../utils';

const { Header, Container } = Layout;

const PageLayout = ({ children, className }) => {
  const componentClassName = classNames({
    'app-layout': true,
    [className]: isNonEmptyStr(className)
  });

  return (
    <Layout className={componentClassName}>
      <Header sticky>
        <Container className="justify-content-center">
          <AppLogo />
        </Container>
      </Header>

      <Container>
        {children}
      </Container>
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string
};

PageLayout.defaultProps = {
  className: null
};

export default PageLayout;
