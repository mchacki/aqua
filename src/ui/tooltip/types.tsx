import { Action } from 'redux';

export enum ActionTypes {
    setTooltip,
    hide
}

export type State = {
    content: string,
    visible: boolean,
    top: number,
    left: number
}

export type TooltipInfos = {
    content: string,
    top: number,
    left: number
}

export interface ISetTooltip extends Action {
    type: ActionTypes.setTooltip;
    payload: TooltipInfos;
}

export interface IHideTooltip extends Action {
    type: ActionTypes.hide;
    payload: undefined
}

export type IAction = ISetTooltip | IHideTooltip;