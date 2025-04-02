import { useState } from "react";

export default function usePersistedState(stateKey, inititalState) {

    const [state,setState] = useState(() => {

        const persistedState = localStorage.getItem(stateKey);

        if (!persistedState) {
            return typeof inititalState === 'function'
                ?
            inititalState()
                :
            inititalState
        }

        const persistedStateData = JSON.parse(persistedState)

       
        return persistedStateData

    });

        const setPersistedState = (input) => {

            
            
            const data = typeof input === 'function'
                    ?
                input(state)
                    :
                  input;

        const persistedData = JSON.stringify(data)
       
        localStorage.setItem(stateKey, persistedData)

        
        /*
        {"email":"peter@abv.bg","username":"Peter","_id":"35c62d76-8152-4626-8712-eeb96381bea8","accessToken":"df495dd226a6e4c7c42c53158f3da6d5bcc98686c86bb2bdf8e82be5dd024b07"}
        */
        setState(data)

        };
    
   return [
    state,
    setPersistedState
   ]
}