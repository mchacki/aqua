import React from 'react';
import { Event, RequestEvent, ResponseEvent } from '../../query'
import { RequestDataEvent, ResponseDataEvent } from '../events';
import { RequestResponsePair } from '../events/RequestResponsePair';

type input = {
    event: Event
}

export const EventTooltip = ({ event }: input) => {
    if (event instanceof RequestEvent) {
        const resp = event.getResponse();
        if (resp) {
            return <RequestResponsePair request={event} response={resp}></RequestResponsePair>
        }
        return <RequestDataEvent event={event}></RequestDataEvent>;
    } else if (event instanceof ResponseEvent) {
        const req = event.getRequest();
        if (req) {
            return <RequestResponsePair request={req} response={event}></RequestResponsePair>
        }
        return <ResponseDataEvent event={event}></ResponseDataEvent>;
    }
    return <></>;
}