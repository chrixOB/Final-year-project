import React, { useEffect } from 'react';
import { auth } from './firebase';

function ExistingUser({ onUserFetched }) {
    useEffect(() => {
        auth.onAuthStateChanged((data) => {
            console.log(data);
            onUserFetched(data);
        });
    }, [onUserFetched]);

    return null; // This component does not need to render anything
}

export default ExistingUser;
