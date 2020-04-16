import React from 'react';
import { Event, RequestEvent, ResponseEvent } from '../../query'
import { RequestDataEvent, ResponseDataEvent } from '../events';
import { RequestResponsePair } from '../events/RequestResponsePair';

type input = {
    event: Event
}

const hasPartner = (event: Event): boolean => {
    if (event instanceof RequestEvent) {
        return event.getResponse() !== undefined;
    }
    if (event instanceof ResponseEvent) {
        return event.getRequest() !== undefined;
    }
    return false;
}

const makePair = (event: Event): [RequestEvent, ResponseEvent] => {
    if (event instanceof RequestEvent) {
        return [event, event.getResponse()];
    } else if (event instanceof ResponseEvent) {
        return [event.getRequest(), event];
    }
    throw "unreachable";
}

export const EventTooltip = ({ event }: input) => {
    if (hasPartner(event)) {
        const [request, response] = makePair(event);

        return <RequestResponsePair request={request} response={response} result={response.getResult()}></RequestResponsePair>
    } else {
        if (event instanceof RequestEvent) {
            return <RequestDataEvent event={event}></RequestDataEvent>;
        } else if (event instanceof ResponseEvent) {
            return <ResponseDataEvent event={event}></ResponseDataEvent>;
        }
    }

    return <></>;
}