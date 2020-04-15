import React from 'react';

import { RequestEvent, CallList, Call, LimitFlag } from '../../query'

type input = {
    event: RequestEvent
}

type CallEntryInput = {
    call: Call
}

type ListEntryInput = {
    list: CallList
}

const flagToOutput = (f: LimitFlag): string => {
    switch (f) {
        case LimitFlag.FULLCOUNT:
            return "COUNT";
        case LimitFlag.SOFT:
            return "SOFT";
        case LimitFlag.HARD:
            return "HARD";
        case LimitFlag.NONE:
            return "";
    }

}

const CallEntry = ({ call }: CallEntryInput) => {
    const { skip, limit, flag } = call;
    return (<>{skip}/{limit === Number.POSITIVE_INFINITY ? "∞" : limit}/{flagToOutput(flag)}</>)
}

const CallListEntry = ({ list }: ListEntryInput) => {
    return <li>{list.specific.map(c => <CallEntry call={c}></CallEntry>)} {list.default ? <>(<CallEntry call={list.default}></CallEntry>)*</> : <></>}</li>
}

export const RequestDataEvent = ({ event }: input) => {
    return (<ul>
        {event.stack.stack.map((el) =>
            (<CallListEntry list={el}></CallListEntry>)
        ).reverse()}
    </ul>);
}