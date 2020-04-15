import React, { useState } from 'react'
import { useAnalysis } from "../analysis"
import { Stage, Layer } from 'react-konva'
import { ExecNode } from './ExecNode'
import { EventArrow } from './EventArrow'
import { Positioner } from './Positioner'
import { TooltipContext } from '../tooltip'



type input = {
    id: string
}

export const QueryDetail = ({ id }: input) => {
    const [state] = useAnalysis();
    const query = state.queries.get(id);
    const numEvents = query.events().length || 1;
    const nodes = query.nodes();
    const [leftBorder, setLeftBorder] = useState(0);
    const [rightBorder, setRightBorder] = useState(100);
    const shiftPerClick = 50;

    const numNodes = nodes.length || 1;
    const positioner = new Positioner({ numEvents, numNodes });
    const shiftLeft = () => {
        setLeftBorder(leftBorder - shiftPerClick);
        setRightBorder(rightBorder - shiftPerClick);
    };
    const shiftRight = () => {
        setLeftBorder(leftBorder + shiftPerClick);
        setRightBorder(rightBorder + shiftPerClick);
    };
    const goToFirst = () => {
        setLeftBorder(0);
        setRightBorder(100);
    };

    const goToLast = () => {
        if (numEvents % 50 === 0) {
            setLeftBorder(numEvents);
            setRightBorder(numEvents + 50);
        } else {
            setLeftBorder(Math.floor(numEvents / 50) * 50);
            setRightBorder(Math.ceil(numEvents / 50) * 50);
        }
    };
    return (
        <>
            <div>
                <button disabled={leftBorder === 0} onClick={() => goToFirst()}>{"First"}</button>
                <button disabled={leftBorder === 0} onClick={() => shiftLeft()}>{"<<<"}</button>
                <button disabled={rightBorder >= numEvents} onClick={() => shiftRight()}>{">>>"}</button>
                <button disabled={rightBorder >= numEvents} onClick={() => goToLast()}>{"Last"}</button>
            </div>
            <TooltipContext.Consumer>
                {value =>
                    <Stage width={positioner.requiredWidth()} height={positioner.requiredHeight()}>
                        <TooltipContext.Provider value={value}>
                            <Layer>
                                {nodes.map((node, nodeIndex) => (<ExecNode key={`${node.id}:${node.type}`} node={node} nodeIndex={nodeIndex} positioner={positioner}></ExecNode>))}
                                {query.events().filter((e, index) => leftBorder <= index && index <= rightBorder)
                                    .map((event, eventIndex) => (<EventArrow key={event.tick} event={event} eventIndex={eventIndex} positioner={positioner} nodeIndex={nodes.findIndex(n => n.id === event.nodeId)}></EventArrow>))}
                            </Layer>
                        </TooltipContext.Provider>
                    </Stage>
                }
            </TooltipContext.Consumer>
        </>
    );
}