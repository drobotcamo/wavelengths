import { doc } from 'firebase/firestore';
import React from 'react';
import {
    useNavigate,
    useParams
} from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import Login from './Login';
import { Lobby } from './interfaces';

export default function LobbyPage() {
    const navigate = useNavigate();
    let { gameId } = useParams();

    const { status, data: user } = useUser();
    const userRef = doc(useFirestore(), 'users', user?.uid ?? "a");
    const { status: userDataStatus, data: userData } = useFirestoreDocData(userRef);
    const lobbyRef = doc(useFirestore(), 'lobbies', gameId ?? 'a');
    const { status: lobbyDataStatus, data: lobbyData } = useFirestoreDocData(lobbyRef);

    if (status === 'loading' || userDataStatus === 'loading' || lobbyDataStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (!user) {
        return (
            <Login />
        );
    }
    if(!lobbyData) {
        navigate("/");
    }
    const lobby = lobbyData as Lobby;

    return (
        <div>
            <h1>Lobby {gameId}</h1>
            <h2>Players</h2>
            <ul>
                {lobbyData?.players.map((player: any) => {
                    return <li key={player}>{player}</li>
                })}
            </ul>
        </div>
    );
}