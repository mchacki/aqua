import { State, IAction, ActionTypes } from "./types";
import { analyzeLog } from "../../logAnalyzer";

export const reducer = async (state: State, action: IAction) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.loadFile:
            const queries = await analyzeLog(payload);
            console.log(queries);
            return { ...state, queries };
    }
};