import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext();

// Create a provider component

export const UserProvider = ({children}) => {
    const [user , setUser] = useState(null);

    return (
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
    );

}

// Custom hook to use the USerContext

export const useUser = () => {
    return useContext(UserContext);
};
