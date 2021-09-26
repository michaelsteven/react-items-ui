import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MenuAppBar from '../Navigation/MenuAppBar';

const PageHeader = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
`;

const HeaderChild = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export default function Header({ children }) {

  return (
    <div>
      <MenuAppBar/>
      <PageHeader>
        <HeaderChild className="width_container">{children}</HeaderChild>
      </PageHeader>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

Header.defaultProps = {
  children: <div />,
};
