import React from 'react'
import { useTooltip } from "./TooltipProvider"


export const Tooltip = () => {
    const [{ top, left, visible, content }] = useTooltip();
    if (visible) {
        return (
            <div style={{ position: "absolute", top, left, background: 'white', zIndex: 1000 }}>
                {content({})}
            </div>
        );
    }
    return (<></>);

}