import React from 'react';
import { useParams } from 'react-router-dom';
import RolePlacard from './components/RolePlacard'
import './Game.css';

export default function Game() {
    let { gameId } = useParams();
    return (
        <div className="game-bg">
            <div className="game-header">
                <RolePlacard role='guesser'></RolePlacard>
            </div>
            <h1 className="game-header">Game {gameId}</h1>
        </div>
    );
}
