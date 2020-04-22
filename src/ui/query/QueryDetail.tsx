import React, { useState, useRef } from 'react'
import { useAnalysis } from "../analysis"
import { Stage, Layer } from 'react-konva'
import { ExecNode } from './ExecNode'
import { EventArrow } from './EventArrow'
import { Positioner } from './Positioner'
import { TooltipContext, useTooltip, setPinned } from '../tooltip';
import { Node } from '../../query'
import { EventScala } from './EventScala'
import { EventPerNodeList } from './EventPerNodeList'



type input = {
    id: string
}

export const QueryDetail = ({ id }: input) => {
    const [state] = useAnalysis();
    const [_, dispatch] = useTooltip();
    const query = state.queries.get(id);
    const numEvents = query.events().length || 1;
    const nodes = query.nodes();
    const [leftBorder, setLeftBorder] = useState(0);
    const shiftPerClick = 10;

    const numNodes = nodes.length || 1;
    const positioner = new Positioner({ numEvents, numNodes });
    const shiftLeft = () => {
        setLeftBorder(leftBorder - shiftPerClick);
    };
    const shiftRight = () => {
        setLeftBorder(leftBorder + shiftPerClick);
    };
    const goToFirst = () => {
        setLeftBorder(0);
    };

    const rightBorder = () => {
        return leftBorder + 300;
    }

    const goToEvent = (target: number) => {
        if (target < 0) {
            target = 0;
        }
        if (target > numEvents) {
            target = numEvents;
        }
        if (target % shiftPerClick === 0) {
            setLeftBorder(target);
        } else {
            setLeftBorder(Math.floor(target / shiftPerClick) * shiftPerClick);
        }
    };

    const goToLast = () => {
        goToEvent(numEvents);
    };

    const userInputRow = useRef(null);

    const goToSelectedLine = () => {
        const target = userInputRow.current.value();
        goToEvent(target);
    };

    const pinEvents = (node: Node) => {
        dispatch(setPinned({ pinnedContent: () => <EventPerNodeList events={query.eventsForNode(node)}></EventPerNodeList> }));
    };

    /*<EventScala left={leftBorder} right={leftBorder + 100} positioner={positioner}></EventScala>*/
    return (
        <>
            <div>
                <button disabled={leftBorder === 0} onClick={() => goToFirst()}>{"First"}</button>
                <button disabled={leftBorder === 0} onClick={() => shiftLeft()}>{"<<<"}</button>
                <button disabled={rightBorder() >= numEvents} onClick={() => shiftRight()}>{">>>"}</button>
                <button disabled={rightBorder() >= numEvents} onClick={() => goToLast()}>{"Last"}</button>
                <input type="text" ref={userInputRow}></input>
                <button onClick={() => goToSelectedLine()}>GO</button>
            </div>
            <TooltipContext.Consumer>
                {value =>
                    <Stage width={positioner.requiredWidth()} height={positioner.requiredHeight()}>
                        <TooltipContext.Provider value={value}>
                            <Layer>

                                {nodes.map((node, nodeIndex) => (<ExecNode key={`${node.id}:${node.type}`} node={node} nodeIndex={nodeIndex} positioner={positioner} pinEvents={pinEvents} ></ExecNode>))}
                                {query.events().filter((e, index) => leftBorder <= index && index <= rightBorder())
                                    .map((event, eventIndex) => (<EventArrow key={event.tick} event={event} eventIndex={eventIndex} positioner={positioner} nodeIndex={nodes.findIndex(n => n.id === event.nodeId)}></EventArrow>))}
                            </Layer>
                        </TooltipContext.Provider>
                    </Stage>
                }
            </TooltipContext.Consumer>)
        </>
    );
}