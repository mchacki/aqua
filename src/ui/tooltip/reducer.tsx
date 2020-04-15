import { State, IAction, ActionTypes } from "./types";

export const reducer = (state: State, action: IAction) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.setTooltip:
            const { top, left, content } = payload;
            return { ...state, top, left, content, visible: true };
        case ActionTypes.hide:
            return { ...state, visible: false };

    }
};