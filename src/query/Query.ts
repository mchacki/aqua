import {Event} from './Event';

export class Query {
  private _events: Event[];

  constructor() {
    this._events = [];
  }

  public events = (): Event[] => {
    return this._events;
  }
}