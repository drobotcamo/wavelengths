import './ProfileImage.css';

export default function ProfileImage({id}: {id: number}) {
    let imagePath: string;
    if (id > 10) {
        id = 1;
    }
    if (id == 0) {
        imagePath = `/assets/pfps/00.gif`
    } else {
        imagePath = `/assets/pfps/${id.toString().padStart(2, '0')}.png`
    }
    return (
        <div className="pfp-image-container">
            <div className="profile-image">
                <img src={imagePath}></img>
            </div>
        </div>
    );
}
