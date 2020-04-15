import React from 'react'
import { useAnalysis } from "../analysis"
import { Stage, Layer } from 'react-konva'
import { ExecNode } from './ExecNode'
import { EventArrow } from './EventArrow'
import { Positioner } from './Positioner'



type input = {
    id: string
}

export const QueryDetail = ({ id }: input) => {
    const [state] = useAnalysis();
    const query = state.queries.get(id);
    const numEvents = query.events().length || 1;
    const nodes = query.nodes();


    const numNodes = nodes.length || 1;
    const positioner = new Positioner({ numEvents, numNodes });

    return (
        <Stage width={700} height={700}>
            <Layer>
                {nodes.map((node, nodeIndex) => (<ExecNode key={`${node.id}:${node.type}`} node={node} nodeIndex={nodeIndex} positioner={positioner}></ExecNode>))}
                {query.events().map((event, eventIndex) => (<EventArrow key={event.tick} event={event} eventIndex={eventIndex} positioner={positioner} nodeIndex={nodes.findIndex(n => n.id === event.nodeId)}></EventArrow>))}
            </Layer>
        </Stage>

    );
}