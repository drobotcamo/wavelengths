import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Form, Columns, Button } from "react-bulma-components";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
const { Input, Field, Label, Help} = Form;
const Column = Columns.Column;

export const USERNAME_MAX_CHARS = 10;

export default function Profile() {
    const { status, data: user } = useUser();
    const userRef = doc(useFirestore(), 'users', user!.uid);
    const { status: userDataStatus, data: userData } = useFirestoreDocData(userRef);

    const [displayName, setDisplayName] = React.useState("");

    useEffect(() => {
        if (userData) {
            setDisplayName(userData.displayName); // Set display name from Firestore once
        }
    }, [userData]);

    const handleDisplayNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDisplayName = e.target.value;
        setDisplayName(newDisplayName);
    };

    if(userDataStatus === 'loading') {
        return <p>Loading User Info...</p>;
    }

    if(!userData) {
        setDoc(userRef, {
            displayName: user!.displayName?.split(' ')[0] ?? "",
            profilePicture: 1,
        });
    }


    return (
        <div>
            <h1>Welcome {userData?.displayName}!</h1>
            <Field>
                <Label>
                    New Display Name
                </Label>
                <Columns>
                    <Column size={2}>
                        <Input value={displayName} onChange={handleDisplayNameChange}></Input>
                    </Column>
                    <Column size={1}>
                        <Button onClick={() => {
                            if (displayName.length > USERNAME_MAX_CHARS) {
                                alert("Warning: Player names can be no more than 10 characters.")
                            } else if (displayName.length === 0) {
                                alert("Warning: Player names must be non-empty.")
                            } else {
                                setDoc(userRef, {displayName: displayName}, { merge: true });
                            }
                        }}>
                            Submit
                        </Button>
                    </Column>
                </Columns>
                <Help color={displayName.length <= USERNAME_MAX_CHARS ? 'success' : 'warning'}>{displayName.length}/10</Help>
            </Field>
        </div>
    )
}
