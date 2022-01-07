import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
