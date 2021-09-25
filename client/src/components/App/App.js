import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { theme  } from '../Library/theme';

import Header from '../Header/Header';
import Home from '../Pages/Home';
import Items from '../Items/Items';

import './App.css';

const DNE = styled.div`
  align-items: center;
  display: flex;
  font-size: 80px;
  height: 80vh;
  justify-content: center;
`;

const NoMatch = () => <DNE>Page does not exist.</DNE>;


const Main = styled.div`
  background: ${(props) => props.theme.colors.background};
  margin: 0;
  min-height: calc(100vh - 64px);
`;

export default function App() {

  function pageSequences() {
      return (
        <ThemeProvider theme={theme}>
            <Main>
              <Router>
                
                  <Header />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/items" component={Items} />
                    <Route component={NoMatch} />
                  </Switch>
                
              </Router>
            </Main>
        </ThemeProvider>
      );
  }

  return <>{pageSequences()}</>;
}
