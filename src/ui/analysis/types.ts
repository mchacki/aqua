import {Action} from 'redux';
import {QueryMap} from '../../logAnalyzer';

export enum ActionTypes {
  loadFile
}

export type State = {
  queries: QueryMap;
}

export interface ILoadFile extends Action {
  type: ActionTypes.loadFile;
  payload: string;
}

export type IAction = ILoadFile;