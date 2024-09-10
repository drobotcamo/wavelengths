import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider } from 'reactfire';
import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyByqRVz1yD1ANz-5H6ZS8kkUffyRmrkZ9s",
  authDomain: "wavelengths-c9f89.firebaseapp.com",
  projectId: "wavelengths-c9f89",
  storageBucket: "wavelengths-c9f89.appspot.com",
  messagingSenderId: "26336351754",
  appId: "1:26336351754:web:f4ebc9ae4464a6171e71f3"
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
