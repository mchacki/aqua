import React from 'react'
import { useAnalysis } from "../analysis"
import { Stage, Layer } from 'react-konva'
import { ExecNode } from './ExecNode'
import { Positioner } from './Positioner'


type input = {
    id: string
}

export const QueryDetail = ({ id }: input) => {
    const [state] = useAnalysis();
    const query = state.queries.get(id);
    const numEvents = query.events().length || 1;
    const numNodes = query.nodes().length || 1;
    const positioner = new Positioner({ numEvents, numNodes });
    return (

        <Stage width={700} height={700}>
            <Layer>
                {query.nodes().map((node, nodeIndex) => (<ExecNode node={node} nodeIndex={nodeIndex} positioner={positioner}></ExecNode>))}
            </Layer>
        </Stage>

    );
}