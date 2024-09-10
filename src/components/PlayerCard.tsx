import Player from './PlayerName'
import ProfileImage from "./ProfileImage";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

import './PlayerCard.css'

export default function PlayerCard({playerUid}: {playerUid: string}) {
    const playerRef = doc(useFirestore(), 'users', playerUid);
    const { status: status, data: data } = useFirestoreDocData(playerRef);
    return (
        <div className="player-card">
            <ProfileImage id={data?.profilePicture ?? 0}></ProfileImage>
            <div className="player-name-container">
                <Player playerUid={playerUid}></Player>
            </div>
        </div>
    );
}
