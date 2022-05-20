import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer, StateProvider } from './state';

import { 
  ApolloClient, 
  ApolloProvider, 
  HttpLink, 
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client} >
        <StateProvider reducer={reducer}>
          <App />
        </StateProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);

