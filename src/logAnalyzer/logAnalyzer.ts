
import {createReadStream} from 'fs';
import {createInterface} from 'readline';

import {CallStack, Event, Query, RequestEvent, ResponseEvent, ResultEvent} from '../query';

import {QueryMap} from './types';

const removeBraces = (input: string): string =>
    input.substring(1, input.length - 1);

const toQueryId = (input: string): string =>
    input.substring(7, input.length - 1);

class LineData {
  public readonly topic: string;
  public readonly pid: string;
  public readonly timestamp: string;
  public readonly logId: string;
  public readonly level: string;
  public readonly data: string;
  public readonly queryId: string|undefined;

  constructor(line: string) {
    const parts = line.split(' ');
    this.timestamp = parts.shift();
    this.pid = removeBraces(parts.shift());
    if (parts[0] === 'C' || parts[0] === 'P' || parts[0] === 'S' ||
        parts[0] === 'A') {
      // Ignore for now, role of server!
      parts.shift();
    }
    this.level = parts.shift();
    this.logId = removeBraces(parts.shift());
    this.topic = removeBraces(parts.shift());
    if (parts.length > 0 && parts[0].startsWith('[query#')) {
      this.queryId = toQueryId(parts.shift());
    }
    this.data = parts.join(' ');
  }
}

// This parses log output to events
const dataToEvent = (data: string): Event|undefined => {
  const splitted = data.split(' ');
  if (splitted[0] === 'execute') {
    if (splitted[1] === 'done') {
      // This is a response
      // Obviously this is super error save!

      /*
        execute done type=ReturnNode this=140580492454384 id=4 state=DONE
        skipped=0 produced=10 shadowRows=0
      */
      const nodeType = splitted[2].split('=')[1];
      const id = parseInt(splitted[4].split('=')[1]);
      const state = splitted[5].split('=')[1];

      const skipped = parseInt(splitted[6].split('=')[1]);
      const produced = parseInt(splitted[7].split('=')[1]);
      const shadowRows = parseInt(splitted[8].split('=')[1]);
      return new ResponseEvent(
          nodeType, id, state, skipped, produced, shadowRows);
    } else if (splitted[2] === 'result:') {
      // 2020-04-12T15:07:08Z [69921] INFO [f12f9] {queries} [query#447] execute
      // type=ReturnNode
      // result: {"nrItems":10,"nrRegs":2,"matrix":[[null,"(non-representable
      // type none)",1],[null,"(non-representable type
      // none)",2],[null,"(non-representable type
      // none)",3],[null,"(non-representable type
      // none)",4],[null,"(non-representable type
      // none)",5],[null,"(non-representable type
      // none)",6],[null,"(non-representable type
      // none)",7],[null,"(non-representable type
      // none)",8],[null,"(non-representable type
      // none)",9],[null,"(non-representable type none)",10]]}
      const nodeType = splitted[1].split('=')[1];
      // pop the first 3 elements
      splitted.shift();
      splitted.shift();
      splitted.shift();
      const joined = splitted.join(' ');
      try {
        const obj = joined === 'nullptr' ? {nrItems: 0, nrRegs: 0, matrix: []} :
                                           JSON.parse(joined);
        return new ResultEvent(nodeType, obj);
      } catch (e) {
        console.log(`Failed to parse result information ${e}`, joined);
        return;
      }
    } else {
      // This is a request
      // Obviously this is super error save!


      /*
        execute type=ReturnNode callStack= [ {specific: [ { skip: 0, softLimit:
        1000, hardLimit: unlimited, fullCount: false } ]} ] this=140580492454384
        id=4
      */
      const nodeType = splitted[1].split('=')[1];
      const id = parseInt(splitted[splitted.length - 1].split('=')[1]);
      // We need to have indexes 3 -> splitted.length -2 so filter all others
      // out and join...
      // No need to include whitespaces, we are in json.
      const joined =
          splitted.filter((e, i) => 3 <= i && i < splitted.length - 2).join('');

      const callStack = new CallStack(joined);
      return new RequestEvent(nodeType, id, callStack);
    }
  }
  return;
};

export const analyzeLog = async(log: string): Promise<QueryMap> => {
  const result: QueryMap = new Map();

  const readInterface = createInterface(createReadStream(log));
  console.log('Start reading');
  let lineNr = 0;
  for await (const line of readInterface) {
    if (++lineNr % 1000 === 0) {
      console.log(`Processed lines ${lineNr}`);
    }
    const parsed = new LineData(line);
    if (parsed.topic === 'queries') {
      if (typeof parsed.queryId === 'string') {
        const qid = parsed.queryId;
        if (!result.has(qid)) {
          result.set(qid, new Query());
        }
        const ev = dataToEvent(parsed.data);
        if (ev) {
          const q = result.get(qid);
          q.addEvent(ev);
        }
      }
    }
  }
  return result;
}