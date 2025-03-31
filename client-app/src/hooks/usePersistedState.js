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

        console.log('PersistedStateData is:', persistedStateData)
        return persistedStateData

    });

        const setPersistedState = (input) => {

            console.log('Input in setPersistedState is:', input)
            
            const data = typeof input === 'function'
                    ?
                input(state)
                    :
                  input;

        const persistedData = JSON.stringify(data)

        localStorage.setItem(stateKey, persistedData)

        console.log('persistedData is:', persistedData)
        
        setState(persistedData)

        };
    
   return [
    state,
    setPersistedState
   ]
}