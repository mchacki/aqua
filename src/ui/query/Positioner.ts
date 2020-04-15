const defaultHeight = 50;
const execNodeWidth = 150;
const eventWidth = 10;
const paddingVertical = 10;

type PositionType = {
  x: number,
  y: number,
  height: number,
  width: number,
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

  execNodePosition(nodeIndex: number): PositionType {
    const x = 10;
    const y = this.getYPosition(nodeIndex);
    const height = defaultHeight;
    const width = execNodeWidth;
    return {x, y, height, width};
  }
}