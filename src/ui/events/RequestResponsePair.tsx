import React from 'react';
import { RequestEvent, ResponseEvent } from '../../query';
import { RequestDataEvent } from './RequestDataEvent';
import { ResponseDataEvent } from './ResponseDataEvent';


type input = {
    request: RequestEvent,
    response: ResponseEvent
};

export const RequestResponsePair = ({ request, response }: input) => {
    return <>
        <RequestDataEvent event={request}></RequestDataEvent>
        <ResponseDataEvent event={response}></ResponseDataEvent>
    </>
}