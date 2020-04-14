import {Event} from './Event';
import {Node} from './Node';

export class Query {
  private _events: Event[];
  private _nodes: Node[];

  constructor() {
    this._events = [];
    this._nodes = [];
  }

  events = (): Event[] => this._events;

  addEvent =
      (e: Event) => {
        this._events.push(e);
        const {nodeId, nodeType} = e;
        const n = this._nodes.find(n => n.id === nodeId);
        if (n === undefined) {
          // We do not know this node yet.
          // Push it on top of the Stack!
          this._nodes.push(new Node(nodeId, nodeType));
        }
      }

  nodes = (): Node[] => this._nodes;
}