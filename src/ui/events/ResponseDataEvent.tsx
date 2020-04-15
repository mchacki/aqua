import React from 'react';

import { ResponseEvent } from '../../query'

type input = {
    event: ResponseEvent
}

export const ResponseDataEvent = ({ event }: input) => {
    return (<ul>
        <li>{`state: ${event.state}`}</li>
        <li>{`skip: ${event.skipped}`}</li>
        <li>{`data: ${event.produced}`}</li>
        <li>{`shadows: ${event.shadowRows}`}</li>
    </ul>)
}