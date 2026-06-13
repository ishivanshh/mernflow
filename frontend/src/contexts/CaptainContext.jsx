import { createContext , useState , useContext, Children } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain , setCaptain] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [error , setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setisLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value = {value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext;
