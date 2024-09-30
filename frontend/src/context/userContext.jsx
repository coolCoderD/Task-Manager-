import React, { createContext, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// UserProvider component to wrap your application
export const UserProvider = ({ children }) => {
    const user = "Hello from the context"; // Replace this with your actual user data or logic

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};
