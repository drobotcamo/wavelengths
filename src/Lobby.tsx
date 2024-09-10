import React from 'react';
import {
    useParams
} from "react-router-dom";

export default function Lobby() {
    let { gameId } = useParams();
    return (
        <div>
            <h1>Lobby {gameId}</h1>
        </div>
    );
}