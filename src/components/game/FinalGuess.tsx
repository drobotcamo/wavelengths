
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Button, Form } from 'react-bulma-components';
import { useFirestore } from 'reactfire';
const { Input, Field, Label, Control } = Form;

export default function FinalGuess({gameId}: {gameId: string}) {
    const gameRef = doc(useFirestore(), 'games', gameId);

    const [guess, setGuess] = React.useState('1');

    return <>
        <Field>
            <Label>
            Enter your final guess:
            </Label>
            <Control>
                <Input value={guess} type="number" onChange={e=> {
                    const value = e.target.value;
                    const guess = Math.floor(Number(value));
                    if (guess > 10 ) {
                        setGuess('10');
                    }
                    else {
                        setGuess(guess.toString());
                    }
                }} ></Input>
            </Control>
        </Field>
        <Button onClick={
            () => {
                if(Number(guess) < 1 || Number(guess) > 10) {
                    alert("Invalid guess");
                    return;
                }
                updateDoc(gameRef, {
                    finalGuess: guess
                });
            }
        }>Submit</Button>
    </>
}