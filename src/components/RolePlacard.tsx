import { Role } from '../interfaces'
import './RolePlacard.css'

export default function RolePlacard({ role }: { role: Role }) {
    return (
        <div className="role-container">
            <div className="subtext-container">
                <p className="role-subtext">Your role is:</p>
            </div>
            <div className="role-name-container">
                <h1>{role.toLocaleUpperCase()}</h1>
            </div>
        </div>
    );
}
