import { createContext, useState, useContext } from "react";



export const CaptainDataContext= createContext();

// export const userCaptain = () =>{
//     const context = useContext(CaptainContext)
//     if(!context){
//         throw new error('context must be used withiin   Captain Provider ')
//     }
//     return context;

// }

const CaptainContext = ({children}) =>{
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData)
    }

    const value  = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }

    return(
        <CaptainDataContext.Provider value ={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}
export default CaptainContext;