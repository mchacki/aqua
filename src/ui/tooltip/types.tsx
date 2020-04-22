import { Action } from 'redux';

export enum ActionTypes {
    setTooltip,
    setPinned,
    hide
}

export type State = {
    content: React.FC,
    pinnedContent: React.FC,
    visible: boolean,
    top: number,
    left: number
}

export type TooltipInfos = {
    content: React.FC,
    top: number,
    left: number
}

export type PinnedInfos = {
    pinnedContent: React.FC
}

export interface ISetTooltip extends Action {
    type: ActionTypes.setTooltip;
    payload: TooltipInfos;
}

export interface IHideTooltip extends Action {
    type: ActionTypes.hide;
    payload: undefined
}

export interface ISetPinned extends Action {
    type: ActionTypes.setPinned;
    payload: PinnedInfos;
}


export type IAction = ISetTooltip | IHideTooltip | ISetPinned;