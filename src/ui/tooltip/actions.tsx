import { ActionCreator } from 'redux';
import { ISetTooltip, IHideTooltip, ISetPinned, ActionTypes, TooltipInfos, PinnedInfos } from './types';

export const setTooltip: ActionCreator<ISetTooltip> = (input: TooltipInfos) => {
    return {
        type: ActionTypes.setTooltip, payload: input
    };
};

export const hideTooltip: ActionCreator<IHideTooltip> = () => ({
    type: ActionTypes.hide,
    payload: undefined
});


export const setPinned: ActionCreator<ISetPinned> = (input: PinnedInfos) => {
    return {
        type: ActionTypes.setPinned, payload: input
    };
};