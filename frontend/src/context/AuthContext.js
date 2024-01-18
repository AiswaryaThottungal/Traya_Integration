import React, {useState,useEffect,useContext, createContext} from 'react';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

 export function AuthContextProvider(props){

    const [authUser, setAuthUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
 }