import React from 'react';
import { useParams } from 'react-router-dom';

export default function Game() {
    let { gameId } = useParams();
    return (
        <div>
            <h1>Game {gameId}</h1>
        </div>
    );
}