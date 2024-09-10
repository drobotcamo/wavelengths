import { doc } from "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";


export default function PlayerName({playerUid}: {playerUid: string}) {
    const playerRef = doc(useFirestore(), 'users', playerUid);
    const { status: status, data: data } = useFirestoreDocData(playerRef);
    
    return (
        <div>{data?.displayName ?? "Loading..."}
        </div>
    );
}