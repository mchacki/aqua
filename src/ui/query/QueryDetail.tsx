import React from 'react'
import { useAnalysis } from "../analysis"

type input = {
    id: string
}

export const QueryDetail = ({ id }: input) => {
    return (
        <div>Selected id {id}</div>
    );
}