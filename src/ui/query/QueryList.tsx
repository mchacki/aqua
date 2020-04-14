import React, { useState } from 'react'
import { useAnalysis } from "../analysis"
import { QueryDetail } from './QueryDetail';

export const QueryList = () => {
    const [state] = useAnalysis();
    const [selectedId, setSelectedId] = useState("0");
    const keys = Array.from(state.queries.keys());

    return (
        <>
            <ul>
                {keys.map(k => (<li key={k}><button onClick={() => setSelectedId(k)}>{k}</button></li>))}
            </ul>
            {(selectedId !== "0") ?
                (<QueryDetail id={selectedId}></QueryDetail>) : <></>
            }
        </>
    )
}