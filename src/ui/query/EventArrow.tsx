import React, { useState } from 'react'
import { Arrow, Text } from 'react-konva'
import { Positioner } from './Positioner';
import { Event, RequestEvent, ResponseEvent } from '../../query'
import { useTooltip, setTooltip, hideTooltip } from '../tooltip';

type input = {
    eventIndex: number,
    positioner: Positioner,
    event: Event,
    nodeIndex: number
}

export const EventArrow = ({ eventIndex, positioner, event, nodeIndex }: input) => {

    const { points } = positioner.eventPosition(eventIndex, nodeIndex, event.type);
    const color = "black";



    const printInfo = (): string => {
        if (event instanceof RequestEvent) {
            return event.stack.toString();

        } else if (event instanceof ResponseEvent) {
            return `state: ${event.state} skip: ${event.skipped} data: ${event.produced} shadows: ${event.shadowRows}`;

        }
    }

    const [, dispatch] = useTooltip();

    const displayText = (event: MouseEvent, toggle: boolean): void => {
        console.log("Enter!", toggle);
        if (toggle) {

            dispatch(setTooltip({ top: event.y + 10, left: event.x + 10, content: printInfo() }));
        } else {
            dispatch(hideTooltip());
        }
    }
    return (
        <>
            <Arrow points={points} stroke={color} strokeWidth={3} pointerLength={10} pointerWidth={12} onMouseEnter={(e) => displayText(e.evt, true)} onMouseLeave={(e) => displayText(e.evt, false)}>

            </Arrow>
        </>
    );
}