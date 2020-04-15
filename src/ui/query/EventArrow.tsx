import React, { useState } from 'react'
import { Arrow, Text } from 'react-konva'
import { Positioner } from './Positioner';
import { Event, RequestEvent, ResponseEvent } from '../../query'

type input = {
    eventIndex: number,
    positioner: Positioner,
    event: Event,
    nodeIndex: number
}

export const EventArrow = ({ eventIndex, positioner, event, nodeIndex }: input) => {

    const { points } = positioner.eventPosition(eventIndex, nodeIndex, event.type);
    const color = "black";
    const [showText, displayText] = useState(false)

    const printInfo = (): string => {
        if (event instanceof RequestEvent) {
            return `{offset: 0, softLimit: 1000, hardLimit: inf, fullCount: false}`;

        } else if (event instanceof ResponseEvent) {
            return `skip: ${event.skipped} data: ${event.produced} shadows: ${event.shadowRows}`;

        }
    }
    return (
        <>
            <Arrow points={points} stroke={color} pointerLength={10} pointerWidth={12} onMouseEnter={() => displayText(true)} onMouseLeave={() => displayText(false)}>

            </Arrow>
            {showText ? (<Text text={printInfo()}></Text>) : (<></>)}
        </>
    );
}