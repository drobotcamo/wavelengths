import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import {
    useNavigate,
    useParams
} from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import Login from './Login';
import { Lobby } from './interfaces';
import { Button } from 'react-bulma-components';
import Player from './components/Player';

export default function LobbyPage() {
    const navigate = useNavigate();
    let { gameId } = useParams();

    const { status, data: user } = useUser();
    const lobbyRef = doc(useFirestore(), 'lobbies', gameId ?? 'a');
    const { status: lobbyDataStatus, data: lobbyData } = useFirestoreDocData(lobbyRef);

    if (status === 'loading' || lobbyDataStatus === 'loading') {
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
    
    if(!lobby.players.includes(user.uid)) {
        updateDoc(lobbyRef, {
            players: [...lobby.players, user.uid]
        });
    }
    
    // get the player's names from the uid using firebase

    return (
        <div>
            <h1>Lobby {gameId}</h1>
            <h2>Players</h2>
            <ul>
                {lobbyData?.players.map((player: any) => {
                    return <Player playerUid={player} />
                })}
            </ul>
            {lobby.host === user.uid && lobby.players.length >= 2 && <Button onClick={() => {}}>Start Game</Button>}
        </div>
    );
}