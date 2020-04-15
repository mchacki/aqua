import React from 'react'
import { Arrow } from 'react-konva'
import { Positioner } from './Positioner';
import { Event } from '../../query'
import { useTooltip, setTooltip, hideTooltip } from '../tooltip';
import { EventTooltip } from './EventTooltip';

type input = {
    eventIndex: number,
    positioner: Positioner,
    event: Event,
    nodeIndex: number
}

export const EventArrow = ({ eventIndex, positioner, event, nodeIndex }: input) => {

    const { points } = positioner.eventPosition(eventIndex, nodeIndex, event.type);
    const color = "black";


    const [, dispatch] = useTooltip();

    const displayText = (evt: MouseEvent, toggle: boolean): void => {
        if (toggle) {
            dispatch(setTooltip({ top: evt.y + 10, left: evt.x + 10, content: () => <EventTooltip event={event}></EventTooltip> }));
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