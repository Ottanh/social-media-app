import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer, StateProvider } from './state';

import { 
  ApolloClient, 
  ApolloProvider, 
  from, 
  HttpLink, 
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

let token = localStorage.getItem('sma-user-token');
export const setHeaderToken = (newToken: string) => {
  token = newToken;
};

const authLink = setContext((_, { headers }) => {  
  return {    
    headers: {      
      ...headers,      
      authorization: token ? `bearer ${token}` : null,    
    }  
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: from([authLink as any, httpLink])
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

