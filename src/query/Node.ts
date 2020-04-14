export class Node {
  public readonly id: number;
  public readonly type: string;

  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }
};