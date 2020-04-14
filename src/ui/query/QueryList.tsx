import React from 'react'
import { useAnalysis } from "../analysis"

export const QueryList = () => {
    const [state] = useAnalysis();
    const keys = Array.from(state.queries.keys());

    return (
        <ul>
            {keys.map(k => (<li>{k}</li>))}
        </ul>
    )
}