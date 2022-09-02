import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './style/app.css';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <StoreProvider>
            <header>
              <h1>
                eFlea
              </h1>
            </header>

            <main>
              <Routes>
                <Route
                  path='/'
                  element={<Home />}
                />
                <Route
                  path='/signup'
                  element={<Signup />}
                />
                <Route
                  path='/login'
                  element={<Login />}
                />
                <Route 
                  path="*" 
                  element={<NoMatch />} 
                />
              </Routes>
            </main>

            <footer>
              this is the footer
            </footer>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
