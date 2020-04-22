import React from 'react'
import { Text, Rect } from 'react-konva'
import { Positioner } from './Positioner';

type input = {
    left: number,
    right: number
    positioner: Positioner
}

export const EventScala = ({ left, right, positioner }: input) => {
    const y = 10;
    const elements = Array.from({ length: right - left }, (_, i) => i + left);
    return (
        <>
            {elements.map(i => <>
                <Text x={positioner.eventXPosition(i)} y={y} width={20} height={20} text={`${i}`} align="center" verticalAlign="middle"></Text></>)}
        </>
    );
}