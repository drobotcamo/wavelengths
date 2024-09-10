import React from 'react';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button, Form } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import { generate } from 'randomstring';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { Lobby } from './interfaces';
import Profile from './components/Profile';
const { Input, Field, Label, Control } = Form;

export default function Login() {
    const navigate = useNavigate();
    const { status, data: user } = useUser();
    const [lobbyCode, setLobbyCode] = React.useState('');
    
    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    if(!user) {
        return (
            <div>
                <h1>Login</h1>
                <p>Sign in to play Wavelengths</p>
                <Button onClick={() => {
                    const googleAuthProvider = new GoogleAuthProvider();
                    signInWithPopup(getAuth(), googleAuthProvider);
                }}>Sign in with Google</Button>
            </div>
        );
    }

    return (
        <div>
            <Profile/>
            <br/>
            <Field>
                <Label>
                Enter a 6 digit lobby code
                </Label>
                <Control>
                    <Input value={lobbyCode} onChange={e=> setLobbyCode(e.target.value.toUpperCase())} ></Input>
                </Control>
            </Field>
            <Button onClick={
                () => {
                    if(lobbyCode.length !== 6) {
                        alert("Invalid lobby code");
                        return;
                    }
                    navigate(`/lobby/${lobbyCode.toUpperCase()}`);
                }
            }>Join</Button>
            <h3>Or:</h3>
            <Button onClick={
                async () => {
                    let newLobbyCode = generate({
                        length: 6,
                        charset: 'alphabetic',
                        readable: true,
                        capitalization: "uppercase"
                    });
                    let codeValid = false;
                    let ref = doc(getFirestore(), "lobbies",newLobbyCode);
                    while(!codeValid) {
                        await getDoc(ref).then((d) => {
                            if(d.exists()) {
                                newLobbyCode = generate({
                                    length: 6,
                                    charset: 'alphabetic',
                                    readable: true,
                                    capitalization: "uppercase"
                                });
                                ref = doc(getFirestore(), "lobbies",newLobbyCode);
                            }
                            else {
                                codeValid = true;
                            }
                        });
                    }
                    console.log(`Creating new lobby ${newLobbyCode}`);
                    const data: Lobby = {
                        players: [user.uid],
                        lastGuesser: null,
                        gameCode: newLobbyCode,
                        host: user.uid,
                        numberWins: {},
                        totalGames: 0
                    };
                    await setDoc(ref, data);
                    navigate(`/lobby/${newLobbyCode}`);
                }
            }>Create new lobby</Button>
            <br/><br/>
            <Button onClick={() => {
                getAuth().signOut();
            }}>Sign out</Button>
        </div>
    );
}