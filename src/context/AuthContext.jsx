import { createContext, useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return <AuthContext.Provider value={{loggedInUser, setLoggedInUser}}>{children}</AuthContext.Provider>
}