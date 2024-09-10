import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RolePlacard from './components/RolePlacard'
import PlayerCard from './components/PlayerCard';
import './GamePage.css';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { doc } from 'firebase/firestore';
import { Game, Lobby } from './interfaces';

export default function GamePage() {
    let { gameId } = useParams();

    const firestore = useFirestore();
    const { status: userDataStatus, data: user } = useUser();
    const lobbyRef = doc(firestore, 'lobbies', gameId ?? 'a');
    const gameRef = doc(firestore, 'games', gameId ?? 'a');
    const { status: lobbyDataStatus, data: lobbyData } = useFirestoreDocData(lobbyRef);
    const { status: gameDataStatus, data: gameData } = useFirestoreDocData(gameRef);

    const [gameLoading, setGameLoading] = useState(true);

    useEffect(() => {
        setGameLoading((gameDataStatus === "loading" || lobbyDataStatus === "loading" || userDataStatus === "loading") ? true : false);

    }, [gameDataStatus,lobbyDataStatus]);

    let game: Game | null = null;
    let lobby: Lobby | null = null;
    let uids: string[] = [];

    if (!gameLoading) {
        if (!lobbyData) {
            return <p>error, the game you requested doesn't exist</p>
        }

        game = gameData as Game;
        lobby = lobbyData as Lobby;
        uids = lobby.players
    }


    return (
        <div className="game-bg">
            {gameLoading ?
                <p>Loading...</p>
                :
                <>
                    <div className="game-header">
                        <RolePlacard role='guesser'></RolePlacard>
                    </div>
                    <div className="gameplay-area">
                        <div className="players-container">
                            {uids.map((uid) => {
                                return <PlayerCard playerUid={uid}></PlayerCard>
                            })}
                        </div>
                        <div className="gameplay-content">
                            {/* the expression below checks if there is an active game for
                            this lobby. if not, the host is prompted with the start game
                            option and the other players are told to wait. might want to
                            make this a variable within the game like 'active' so that
                            we don't have to destroy a game document when it's over.  */}

                            {game ?
                            <>
                                {/*active game componenet*/}
                            </>
                            :
                            <>
                                {lobby?.host === user?.uid ? <p>You're the host!</p> : <p>You're not the host</p>}
                            </>
                            }
                        </div>
                    </div>
                </>
            }

        </div>
    );
}
