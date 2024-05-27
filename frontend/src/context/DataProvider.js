import { createContext,useState } from "react"

export const DataContext=createContext(null);

const DataProvider=({children})=>{
    /*DataProvider: A functional component that will wrap other components to provide them access to the account state.
useState({ username: '', name: '' }): Initializes the state account with an object containing username and name properties, both initially empty strings.
DataContext.Provider: A component that makes the account state and the setAccount function available to any child components that consume this context.
*/ 

    const [account,setAccount]=useState({username:'',name:''});

    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataProvider;