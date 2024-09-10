import { doc, setDoc } from "firebase/firestore";
import { Form } from "react-bulma-components";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
const { Input, Field, Label, Control } = Form;

export default function Profile() {
    const { status, data: user } = useUser();
    const userRef = doc(useFirestore(), 'users', user!.uid);
    const { status: userDataStatus, data: userData } = useFirestoreDocData(userRef);

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
                <Control>
                    <Input value={userData?.displayName} onChange={e=> {
                        setDoc(userRef, {displayName: e.target.value});
                    }} ></Input>
                </Control>
            </Field>
        </div>
    )
}
