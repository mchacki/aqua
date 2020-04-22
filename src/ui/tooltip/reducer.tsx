import { State, IAction, ActionTypes } from "./types";

export const reducer = (state: State, action: IAction) => {
    switch (action.type) {
        case ActionTypes.setTooltip:
            const { top, left, content } = action.payload;
            return { ...state, top, left, content, visible: true };
        case ActionTypes.setPinned:
            const { pinnedContent } = action.payload;
            console.log(pinnedContent);
            return { ...state, pinnedContent };
        case ActionTypes.hide:
            return { ...state, visible: false };

    }
};