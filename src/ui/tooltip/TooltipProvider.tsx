import React, { useReducer, createContext, Dispatch, useContext } from "react";
import { State, IAction } from "./types";
import { reducer } from "./reducer";

const initialState: State = {
    visible: false,
    content: () => (<></>),
    pinnedContent: () => (<></>),
    top: 0,
    left: 0
};

type ContextType = [
    State,
    Dispatch<IAction>
];

interface ITooltipProvider extends JSX.ElementChildrenAttribute { };

export const TooltipContext = createContext<ContextType>([initialState, () => { }]);

export const TooltipProvider: React.FC<ITooltipProvider> = ({ children }) => {
    const contextValue = useReducer(reducer, initialState);

    return (
        <TooltipContext.Provider value={contextValue}>
            {children}
        </TooltipContext.Provider>
    );
}


export const useTooltip: () => ContextType = () => useContext(TooltipContext);