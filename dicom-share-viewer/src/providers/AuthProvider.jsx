import React, {useEffect, useState} from 'react';

import {AuthContext} from './contexts';
import {getStoredUserId, storeUserId} from "../utility";

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(getStoredUserId() || null);

    const login = (id) => {
        if (id) {
            storeUserId(id);
            setAuth(id);
        }
    };
    const logout = () => {
        storeUserId();
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}