
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Button, Form } from 'react-bulma-components';
import { useFirestore, useUser } from 'reactfire';
import { Game } from '../../interfaces';
const { Input, Field, Label, Control } = Form;

export default function SubmitAnswer({gameId, submissions, catNum}: {gameId: string, submissions: any[], catNum: number}) {
    const gameRef = doc(useFirestore(), 'games', gameId);

    const [answer, setAnswer] = React.useState('');
    const { status: userDataStatus, data: user } = useUser();

    return <>
        <Field>
            <Label>
            Enter your answer:
            </Label>
            <Control>
                <Input  onChange={e=> setAnswer(e.target.value)} ></Input>
            </Control>
        </Field>
        <Button onClick={
            () => {
                if(answer.length === 0) {
                    alert("Invalid category");
                    return;
                }
                const subs = [...submissions];
                if(subs[catNum] === undefined) {
                    subs[catNum] = {};
                }
                subs[catNum][user?.uid ?? ""] = answer;
                console.log(subs);
                
                updateDoc(gameRef, {
                    submissions: subs
                });
            }
        }>Submit</Button>
    </>
}