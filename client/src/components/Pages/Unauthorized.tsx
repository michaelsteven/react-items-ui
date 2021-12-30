import React from 'react';
import styled from 'styled-components';
import {Page} from '../common/index';

const ErrorMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
  font-size: 5rem;
  font-weight: bold;
`;

const NotFoundContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 112px);
`;

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Unauthorized() {
  return (
    <Page>
      <Error>
        <ErrorMessage>401 Unauthorized</ErrorMessage>
      </Error>
    </Page>
  );
}

Unauthorized.propTypes = {};

Unauthorized.defaultProps = {};
