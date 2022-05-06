import React, { useContext } from 'react'
import firebase from "../firebase";

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const  [ currentUser, setCurrentUser] = useState()

    function authenticateAnon(){
        firebase.auth().signInAnonymously().catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorCode, errorMessage)
        });
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log(user)
        }) 
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        authenticateAnon
    }


  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
