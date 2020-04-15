export enum LimitFlag {
  FULLCOUNT,
  SOFT,
  HARD,
  NONE
}

export type Call = {
  skip: number,
  limit: number,
  flag: LimitFlag
}

export type CallList = {
  specific: Call[],
  default?: Call
}

const objectToCall = (input: any):
    Call => {
      let {skip, softLimit, hardLimit, fullCount} = input;
      let flag = LimitFlag.NONE;
      if (softLimit === 'inf') {
        softLimit = Number.POSITIVE_INFINITY;

      } else {
        flag = LimitFlag.SOFT;
      }
      if (hardLimit === 'inf') {
        hardLimit = Number.POSITIVE_INFINITY;
      } else {
        flag = LimitFlag.HARD;
      }
      if (fullCount === true) {
        flag = LimitFlag.FULLCOUNT;
      }
      const limit = Math.min(softLimit, hardLimit);
      return {skip, limit, flag};
    }

const listToCalls = (input: Array<any>):
    Call[] => {
      return input.map(objectToCall);
    }

const entryToCallList = (input: any):
    CallList => {
      const specific = listToCalls(input.specific);
      if (input.hasOwnProperty('default')) {
        return {specific, default: objectToCall(input.default)};
      }
      return {specific};
    }

export class CallStack {
  readonly stack: CallList[];

  constructor(serialized: string) {
    try {
      const addQuotesForProperties =
          serialized.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
              .replace(/unlimited/g, '"inf"');
      const parsed = JSON.parse(addQuotesForProperties) as Array<Object>;
      this.stack = parsed.map(entryToCallList);
    } catch (e) {
      alert(`Failed to parse file ${e.toString()}`);
    }
  }
}