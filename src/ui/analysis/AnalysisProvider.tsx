import React, { createContext, Dispatch, useContext } from "react";
import { State, IAction } from "./types";
import { reducer } from "./reducer";
import { useAsyncReducer } from "../asyncReducer";

const initialState: State = {
    queries: new Map()
};

type ContextType = [
    State,
    Dispatch<IAction>
];

interface IAnalysisProvider extends JSX.ElementChildrenAttribute { };

const AnalysisContext = createContext<ContextType>([initialState, () => { }]);

export const AnalysisProvider: React.FC<IAnalysisProvider> = ({ children }) => {
    const contextValue = useAsyncReducer(reducer, initialState);

    return (
        <AnalysisContext.Provider value={contextValue}>
            {children}
        </AnalysisContext.Provider>
    );
}


export const useAnalysis: () => ContextType = () => useContext(AnalysisContext);