export class CallStack {
  private readonly _content: string;

  constructor(serialized: string) {
    this._content = serialized
  }
  toString(): string {
    return this._content;
  }
}