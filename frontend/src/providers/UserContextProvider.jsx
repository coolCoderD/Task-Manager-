import React from 'react';
import { UserProvider } from '../context/userContext';

// UserContextProvider component that wraps children with UserProvider
function UserContextProvider({ children }) {
    return <UserProvider>{children}</UserProvider>;
}

export default UserContextProvider;
