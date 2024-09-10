
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { Button, Form } from 'react-bulma-components';
import { useFirestore } from 'reactfire';
const { Input, Field, Label, Control } = Form;

export default function EnterCategory({gameId}: {gameId: string}) {
    const gameRef = doc(useFirestore(), 'games', gameId);

    const [category, setCategory] = React.useState('');

    return <>
        <Field>
            <Label>
            Enter the category:
            </Label>
            <Control>
                <Input  onChange={e=> setCategory(e.target.value)} ></Input>
            </Control>
        </Field>
        <Button onClick={
            () => {
                if(category.length === 0) {
                    alert("Invalid category");
                    return;
                }
                updateDoc(gameRef, {
                    cats: arrayUnion(category)
                });
            }
        }>Submit</Button>
    </>
}