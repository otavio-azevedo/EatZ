import React from 'react';
import { AuthenticationProvider } from './contexts/authentication';
import Routes from './routes/routes';

export default function App() {
  return (
    <AuthenticationProvider>
      <Routes />
    </AuthenticationProvider>
  );
}
