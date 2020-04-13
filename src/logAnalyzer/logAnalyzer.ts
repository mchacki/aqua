
import {createReadStream} from 'fs';
import {createInterface} from 'readline';
import {Query} from '../query';

const removeBraces = (input: string): string =>
    input.substring(1, input.length - 1);

const toQueryId = (input: string): string =>
    input.substring(7, input.length - 1);

class LineData {
  public readonly topic: String;
  public readonly pid: String;
  public readonly timestamp: String;
  public readonly logId: String;
  public readonly level: String;
  public readonly data: String;
  public readonly queryId: String|undefined;

  constructor(line: string) {
    const parts = line.split(' ');
    this.timestamp = parts.shift();
    this.pid = removeBraces(parts.shift());
    this.level = parts.shift();
    this.logId = removeBraces(parts.shift());
    this.topic = removeBraces(parts.shift());
    if (parts.length > 0 && parts[0].startsWith('[query#')) {
      this.queryId = toQueryId(parts.shift());
    }
    this.data = parts.join(' ');
  }
}

export const analyzeLog = async(log: string): Promise<Map<string, Query>> => {
  const result = new Map();

  const readInterface = createInterface(createReadStream(log));

  for await (const line of readInterface) {
    const parsed = new LineData(line);
    if (parsed.topic === 'queries') {
      if (typeof parsed.queryId === 'string') {
        const qid = parsed.queryId;
        if (!result.has(qid)) {
          result.set(qid, new Query());
        }
      }
    }
  }
  return result;
}