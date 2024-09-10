import React from 'react';
import { useParams } from 'react-router-dom';
import RolePlacard from './components/RolePlacard'
import PlayerCard from './components/PlayerCard';
import './Game.css';

export default function Game() {
    let { gameId } = useParams();
    let uid: string = "ERA7vUSuMHfclEdTHe5B0E6GzD62";
    return (
        <div className="game-bg">
            <div className="game-header">
                <RolePlacard role='guesser'></RolePlacard>
            </div>
            <div className="gameplay-area">
                <div className="players-container">
                    <PlayerCard playerUid={uid}></PlayerCard>
                </div>
            </div>
        </div>
    );
}
