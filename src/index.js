import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from 'react-auth-kit';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <App />
  </AuthProvider>
);
