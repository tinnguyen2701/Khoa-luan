import React, { useEffect } from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store from 'store';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import Manuals from './components/Home/Manuals';
import ListSearch from './components/Home/ListSearch';
import { LOGIN_USER_RESPONSE } from './components/Home/ducks';

export default () => {
  useEffect(() => {
    const username = window.localStorage.getItem('username');
    if (username != null) store.dispatch({ type: LOGIN_USER_RESPONSE, payload: { username } });
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <BrowserRouter>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/manuals" component={Manuals} />
          <Route path="/Manuals/:name" component={Manuals} />
          <Route path="/About" component={Home} />
          <Route path="/About/:name" component={Home} />
          <Route path="/List-Search" component={ListSearch} />
        </Router>
      </BrowserRouter>
    </ThemeProvider>
  );
};
