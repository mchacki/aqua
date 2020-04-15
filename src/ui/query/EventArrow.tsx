import React from 'react'
import { Arrow } from 'react-konva'
import { Positioner } from './Positioner';
import { Event } from '../../query'

type input = {
    eventIndex: number,
    positioner: Positioner,
    event: Event,
    nodeIndex: number
}

export const EventArrow = ({ eventIndex, positioner, event, nodeIndex }: input) => {

    const { points } = positioner.eventPosition(eventIndex, nodeIndex, event.type);
    const color = "red";
    return (
        <>
            <Arrow points={points} stroke={color} tension={1} pointerLength={10} pointerWidth={12}>

            </Arrow>
        </>
    );
}