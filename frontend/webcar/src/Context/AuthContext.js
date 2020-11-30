import React, { createContext } from 'react'

import useAuth from './hooks/useAuth'

const Context = createContext();

function AuthProvider({children}){
    const { authenticated, loading,idCamelao, permissionCamaleao, handleLogin, handleLogout  } = useAuth()
    
    return (
        <Context.Provider value={{loading, authenticated,idCamelao, permissionCamaleao, handleLogin, handleLogout }}>
            {children}
        </Context.Provider>
    )
}


export {Context, AuthProvider}