import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import {
    useNavigate,
    useParams
} from "react-router-dom";
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import Login from './Login';
import { Game, Lobby } from './interfaces';
import { Button } from 'react-bulma-components';
import Player from './components/Player';

export default function LobbyPage() {
    const navigate = useNavigate();
    let { gameId } = useParams();
    const firestore = useFirestore();

    const { status, data: user } = useUser();
    const lobbyRef = doc(firestore, 'lobbies', gameId ?? 'a');
    const gameRef = doc(firestore, 'games', gameId ?? 'a');
    const { status: lobbyDataStatus, data: lobbyData } = useFirestoreDocData(lobbyRef);
    const { status: gameDataStatus, data: gameData } = useFirestoreDocData(gameRef);

    if (status === 'loading' || lobbyDataStatus === 'loading' || gameDataStatus === 'loading') {
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
    
    return (
        <div>
            <h1>Lobby {gameId}</h1>
            <h2>Players</h2>
            <ul>
                {lobbyData?.players.map((player: any) => {
                    return <Player playerUid={player} />
                })}
            </ul>
            {gameData && <Button onClick={() => {
                navigate(`/game/${gameId}`);
            }}>Resume Game</Button>}
            {!gameData && lobby.host === user.uid && lobby.players.length >= 2 && <Button onClick={() => {
                const currentIdx = lobby.lastGuesser ? lobby.players.indexOf(lobby.lastGuesser) : 0;
                const nextIdx = (currentIdx + 1) % lobby.players.length;
                const game: Game = {
                    currentCategory: 0,
                    cats: [],
                    submissions: [],
                    guesser: lobby.players[nextIdx],
                    chosenNumber: Math.floor(Math.random() * 9) + 1,
                    numCategories: 3,
                    guesserMin: 0,
                    guesserMax: 10
                }
                setDoc(gameRef, game);
                navigate(`/game/${gameId}`);
            }}>Start Game</Button>}
        </div>
    );
}