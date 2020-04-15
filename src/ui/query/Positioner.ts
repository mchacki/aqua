import {EventType} from '../../query';

const defaultHeight = 20;
const execNodeWidth = 150;
const eventWidth = 10;
const paddingVertical = 10;

/*
const defaultHeight = 20;
const execNodeWidth = 50;
const eventWidth = 2;
const paddingVertical = 2;
*/

type PositionType = {
  x: number,
  y: number,
  height: number,
  width: number
};


type InputParams = {
  numNodes: number,
  numEvents: number
}

export class Positioner {
  private readonly _numNodes: number;
  private readonly _numEvents: number;


  constructor({numNodes, numEvents}: InputParams) {
    this._numEvents = numEvents;
    this._numNodes = numNodes;
  }


  private getYPosition(nodeIndex: number) {
    // position 0 is top, but nodeIndex 0 is bottom
    const inverseNum = this._numNodes - nodeIndex;
    return inverseNum * (paddingVertical + defaultHeight)
  }

  private getXPosition(eventIndex: number) {
    return 10 + execNodeWidth + (eventIndex + 1) * eventWidth;
  }

  private alignToTopNode(y: number): number {
    return y + (defaultHeight / 2);
  }

  private alignToBottomNode(y: number): number {
    return this.alignToTopNode(y) + defaultHeight + paddingVertical;
  }

  private startToPoints(x: number, y: number, type: EventType) {
    if (type === EventType.REQUEST) {
      return [x, this.alignToBottomNode(y), x, this.alignToTopNode(y)];
    }
    return [x, this.alignToTopNode(y), x, this.alignToBottomNode(y)];
  }

  requiredHeight(): number {
    return (this._numNodes + 1) * (defaultHeight + paddingVertical);
  }

  requiredWidth(): number {
    if (this._numEvents > 100) {
      return 10 + execNodeWidth + 101 * eventWidth;
    }
    return 10 + execNodeWidth + (this._numEvents + 1) * eventWidth;
  }

  eventPosition(eventIndex: number, nodeIndex: number, type: EventType) {
    const y = this.getYPosition(nodeIndex);
    const x = this.getXPosition(eventIndex);

    const points = this.startToPoints(x, y, type);
    return {points};
  }

  execNodePosition(nodeIndex: number): PositionType {
    const x = 10;
    const y = this.getYPosition(nodeIndex);
    const height = defaultHeight;
    const width = execNodeWidth;
    return {x, y, height, width};
  }
}