import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './history';

import {AuthProvider} from './Context/AuthContext'
import {VisualProvider} from './Context/VisualContext'
function App() {
  return (
    <AuthProvider>
      <VisualProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </VisualProvider>
    </AuthProvider>
  );
}

export default App;
