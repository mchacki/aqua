import React from 'react'
import { Rect, Text } from 'react-konva'
import { Positioner } from './Positioner';
import { Node } from '../../query'


type input = {
    nodeIndex: number,
    positioner: Positioner,
    node: Node,
    pinEvents: (node: Node) => void
}

export const ExecNode = ({ nodeIndex, positioner, node, pinEvents }: input) => {

    const { x, y, width, height } = positioner.execNodePosition(nodeIndex);
    const color = "red";
    return (
        <>
            <Rect
                x={x} y={y} width={width} height={height}
                fill={color}
            ></Rect>
            <Text x={x} y={y} width={width} height={height} text={`${node.id}:${node.type}`} align="center" verticalAlign="middle" onClick={() => pinEvents(node)}></Text>
        </>
    );
}