import {Event, RequestEvent, ResponseEvent, ResultEvent} from './Event';
import {Node} from './Node';

export class Query {
  private _events: Event[];
  private _nodes: Node[];
  private _openRequests: RequestEvent[];

  constructor() {
    this._events = [];
    this._nodes = [];
    this._openRequests = [];
  }

  events = (): Event[] => this._events;

  addEvent =
      (e: Event) => {
        if (e instanceof ResultEvent) {
          const resp = this._events[this._events.length - 1] as ResponseEvent;
          resp.setResult(e);
        } else {
          this._events.push(e);
          if (e instanceof RequestEvent) {
            // Only requests can trigger new nodes
            const {nodeId, nodeType} = e;
            const n = this._nodes.find(n => n.id === nodeId);
            if (n === undefined) {
              // We do not know this node yet.
              // Push it on top of the Stack!
              this._nodes.push(new Node(nodeId, nodeType));
            }
            this._openRequests.push(e);
          } else if (e instanceof ResponseEvent) {
            const reqEvent = this._openRequests.pop();
            reqEvent.setResponse(e);
            e.setRequest(reqEvent);
          }
        }
      }

  nodes = (): Node[] => this._nodes;
}