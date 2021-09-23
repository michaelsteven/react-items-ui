import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { theme, muiTheme } from '../Library/theme';

import Header from '../Header/Header';
import Home from '../Pages/Home';
import Items from '../Items/Items';
import NewItem from '../Items/New';
import EditItem from '../Items/Edit';

import './App.css';

const DNE = styled.div`
  align-items: center;
  display: flex;
  font-size: 80px;
  height: 80vh;
  justify-content: center;
`;

const NoMatch = () => <DNE>Page does not exist.</DNE>;

const muiThemeObject = muiTheme();

const Main = styled.div`
  background: ${(props) => props.theme.colors.background};
  margin: 0;
  min-height: calc(100vh - 64px);
`;

export default function App() {

  function pageSequences() {
      return (
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={muiThemeObject}>
            <Main>
              <Router>
                
                  <Header />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/items" component={Items} />
                    <Route exact path="/items/new" component={NewItem} />
                    <Route exact path="/items/edit" component={EditItem} />
                    <Route component={NoMatch} />
                  </Switch>
                
              </Router>
            </Main>
          </MuiThemeProvider>
        </ThemeProvider>
      );
  }

  return <>{pageSequences()}</>;
}
