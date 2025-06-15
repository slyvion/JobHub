import React, {createContext, useContext, useEffect, useState} from 'react';
import {me} from "../Components/Services/authServices.js";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    const loadUser = async () => {
        const res = await me();
        setUser({
            name: res.data.name,
            id: res.data.id,
            type: res.type
        })
    }
    useEffect(() => {
        loadUser();
    }, [])
    return (
        <UserContext.Provider value={{user, loadUser}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
