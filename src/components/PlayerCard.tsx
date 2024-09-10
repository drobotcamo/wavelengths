import Player from '../components/Player'
import ProfileImage from "./ProfileImage";
import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";

export default function PlayerCard({playerUid}: {playerUid: string}) {
    const playerRef = doc(useFirestore(), 'users', playerUid);
    const { status: status, data: data } = useFirestoreDocData(playerRef);
    return (
        <div className="player-card">
            <ProfileImage id={data?.profilePicture ?? 0}></ProfileImage>
            <Player playerUid={playerUid}></Player>
        </div>
    );
}
