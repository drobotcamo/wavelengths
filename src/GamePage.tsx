import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RolePlacard from './components/RolePlacard'
import PlayerCard from './components/PlayerCard';
import './GamePage.css';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { doc, updateDoc } from 'firebase/firestore';
import { Game, Lobby } from './interfaces';
import PlayerName from './components/PlayerName';
import { Form } from 'react-bulma-components';
import EnterCategory from './components/game/EnterCategory';
import SubmitAnswer from './components/game/SubmitAnswer';
import FinalGuess from './components/game/FinalGuess';
const { Input, Field, Label, Control } = Form;

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

    // move to next round if all players have submitted
    if(game && lobby) {
        if(game.guesser !== user?.uid) {
            console.log(game.cats[game.currentCategory], game.submissions[game.currentCategory], uids.length)
            if(game.cats[game.currentCategory] && game.submissions[game.currentCategory] && Object.keys(game.submissions[game.currentCategory]).length === uids.length - 1) {
                updateDoc(gameRef, {
                    currentCategory: game.currentCategory + 1
                });
            }
        }
    }


    return (
        <div className="game-bg">
            {gameLoading ?
                <p>Loading...</p>
                :
                <>
                    <div className="game-header">
                        <RolePlacard role={game?.guesser === user?.uid ? 'guesser' : 'provider'}></RolePlacard>
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
                                {game.guesser !== user?.uid ? 
                                <>
                                    <p>Your goal is to guess the number between 1 and 10 the other players have</p>
                                    {
                                        game.currentCategory == game.numCategories ? <>
                                            <FinalGuess gameId={gameId!} />
                                        </> : game.cats.length <= game.currentCategory ? 
                                        <>
                                            <EnterCategory gameId={gameId!}></EnterCategory>
                                        </>
                                        : <p>Category {game.currentCategory + 1}: {game.cats[game.currentCategory]}</p>
                                    }
                                </> : <> 
                                    <p>Your goal is to get <PlayerName playerUid={game.guesser} /> to guess the number {game.chosenNumber}</p>
                                    {
                                        game.cats.length <= game.currentCategory ? 
                                        <>
                                            <p>Waiting for <PlayerName playerUid={game.guesser} /> to enter a category... </p>
                                        </>
                                        : <>
                                            <p>Category {game.currentCategory + 1}: {game.cats[game.currentCategory]}</p>
                                            {
                                                (game.submissions[game.currentCategory] ?? {})[user?.uid ?? ""] === undefined ?
                                                <SubmitAnswer gameId={gameId!} submissions={game.submissions} catNum={game.currentCategory}></SubmitAnswer> :
                                                <p>Waiting for all other players to submit...</p>
                                            }
                                            
                                        </>
                                        
                                    }
                                </>}
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
