import { ActionCreator } from 'redux';
import { ISetTooltip, IHideTooltip, ActionTypes, TooltipInfos } from './types';

export const setTooltip: ActionCreator<ISetTooltip> = (input: TooltipInfos) => {
    return {
        type: ActionTypes.setTooltip, payload: input
    };
};

export const hideTooltip: ActionCreator<IHideTooltip> = () => ({
    type: ActionTypes.hide,
    payload: undefined
});