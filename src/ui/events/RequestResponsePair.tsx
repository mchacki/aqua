import React from 'react';
import { RequestEvent, ResponseEvent, ResultEvent } from '../../query';
import { RequestDataEvent } from './RequestDataEvent';
import { ResponseDataEvent } from './ResponseDataEvent';
import { ResultDataEvent } from './ResultDataEvent';


type input = {
    request: RequestEvent,
    response: ResponseEvent,
    result: ResultEvent | undefined
};

export const RequestResponsePair = ({ request, response, result }: input) => {
    return <table>
        <tbody>
            <tr><td>
                <RequestDataEvent event={request}></RequestDataEvent>
            </td>
                <td>
                    <ResponseDataEvent event={response}></ResponseDataEvent>
                </td>
            </tr>
            {result !== undefined ? <tr> <td colSpan={2}><ResultDataEvent event={result}></ResultDataEvent></td> </tr> : <></>}
        </tbody>
    </table >
}