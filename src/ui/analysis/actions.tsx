import { ActionCreator } from 'redux';
import { ILoadFile, ActionTypes } from './types';

export const loadFile: ActionCreator<ILoadFile> = (path: string) => ({
    type: ActionTypes.loadFile, payload: path
});