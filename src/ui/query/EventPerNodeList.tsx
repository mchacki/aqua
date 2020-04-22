import React from 'react';
import { Event } from '../../query';
import { EventTooltip } from './EventTooltip';

type input = {
    events: Event[]
}

export const EventPerNodeList = ({ events }: input) => {
    return (
        <div>
            {events.map((e) => <EventTooltip key={e.tick} event={e}></EventTooltip>)}
        </div>
    )
}