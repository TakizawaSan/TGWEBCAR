import React, { createContext } from 'react'


const VisualContext = createContext();

function VisualProvider({children}){
    
    return (
        <VisualContext.Provider value={{}}>
            {children}
        </VisualContext.Provider>
    )
}
export {VisualContext, VisualProvider}