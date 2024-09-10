import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Lobby from './Lobby';
import Game from './Game';

function App() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Login />,
    },
    {
      path: "/lobby/:gameId",
      element: <Lobby />,
    },
    {
      path: "/game/:gameId",
      element: <Game />,
    }
  ]);

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>
        <RouterProvider router={router} />
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
