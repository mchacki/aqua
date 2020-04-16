import React from 'react';

import { ResultEvent } from '../../query'

type input = {
    event: ResultEvent
}

type MatrixRowInput = {
    row: Array<any>
};

const MatrixRow = ({ row }: MatrixRowInput) => {
    const shadow = (row[0] !== null);
    return (<tr className={shadow ? "shadowRow" : "dataRow"}>
        {row.map((c, i) => (c === "(non-representable type none)" ? (<td key={i} className="deadRegister">-</td>) : (<td key={i}>{JSON.stringify(c)}</td>)))}
    </tr>);
}

export const ResultDataEvent = ({ event }: input) => {
    const { nrRegs, nrItems, matrix } = event;
    return (<><p>Regs: {nrRegs} items: {nrItems}</p>
        <table>
            <tbody>
                {matrix.map((row, i) => <MatrixRow key={i} row={row}></MatrixRow>)}
            </tbody>
        </table>
    </>
    );
}