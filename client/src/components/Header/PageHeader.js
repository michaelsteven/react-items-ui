import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PageHeaderSC = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  height: 90px;
  width: 100%;
`;

const PageHeader = ({ children, ...props }) => (
  <PageHeaderSC {...props}>{children}</PageHeaderSC>
);

PageHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PageHeader.defaultProps = {
  children: null,
};

export default PageHeader;
