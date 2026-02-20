import React from 'react';
import Auth from './Auth';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    // Replace "YOUR_CLIENT_ID" with a real one from Google Console later
    // For now, even a random string like "123" will stop the white screen
    <GoogleOAuthProvider clientId="198473426738-d0o59tf5mr4q7jpl4lgae0qh13mi7ilh.apps.googleusercontent.com">
      <div>
        <Auth />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;