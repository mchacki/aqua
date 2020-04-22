import React from 'react'
import { useTooltip } from './TooltipProvider';


export const PinnedView = () => {
    const [state] = useTooltip();
    console.log(state);
    const [{ pinnedContent }] = useTooltip();
    console.log(pinnedContent);
    return (
        <div style={{ position: "absolute", right: 0, top: 40, background: "white" }}>
            {pinnedContent({})}
        </div >
    );

}