import React from 'react';
import { AuthProvider } from '../hooks/useAuth'; // Adjust the path as needed

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
