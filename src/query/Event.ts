import {CallStack} from './CallStack';

export enum EventType {
  REQUEST,
  RESPONSE
}

// generate infinitly many ticks
function* tickGenerator() {
  let tick = 0;
  while (true) {
    yield tick++;
  }
  return 0;
}

const genInstance = tickGenerator();

export interface Event {
  readonly tick: number;
  readonly type: EventType;
  readonly nodeType: string;
  readonly nodeId: number;
}

// Private class.
// Not exported, this will encapsulate all
// Shared vent methods.
class BaseEvent implements Event {
  readonly tick: number;
  readonly type: EventType;
  readonly nodeType: string;
  readonly nodeId: number;

  constructor(type: EventType, nodeType: string, nodeId: number) {
    this.tick = genInstance.next().value;
    this.type = type;
    this.nodeType = nodeType;
    this.nodeId = nodeId;
  }
}

/*
execute type=ReturnNode callStack= [ {specific: [ { skip: 0, softLimit: 1000,
hardLimit: unlimited, fullCount: false } ]} ] this=140580492454384 id=4
*/
export class RequestEvent extends BaseEvent {
  readonly stack: CallStack;
  constructor(nodeType: string, nodeId: number, callStack: CallStack) {
    super(EventType.REQUEST, nodeType, nodeId);
    this.stack = callStack;
  }
}

/*
execute done type=ReturnNode this=140580492454384 id=4 state=DONE skipped=0
produced=10 shadowRows=0
*/
export class ResponseEvent extends BaseEvent {
  readonly state: string;
  readonly skipped: number;
  readonly produced: number;
  readonly shadowRows: number;

  constructor(
      nodeType: string, nodeId: number, state: string, skipped: number,
      produced: number, shadowRows: number) {
    super(EventType.RESPONSE, nodeType, nodeId);
    this.state = state;
    this.skipped = skipped;
    this.produced = produced;
    this.shadowRows = shadowRows;
  }
}