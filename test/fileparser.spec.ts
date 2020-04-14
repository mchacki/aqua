import 'mocha';

import {expect} from 'chai';
import {analyzeLog} from '../src/logAnalyzer';
import {Query} from '../src/query';

import fixturePath from './fixturePath';

const stringifyMap = (map: Map<string, Query>): string =>
    JSON.stringify(Array.from(map.entries()));

describe('Read from file', () => {
  describe('No query found', () => {
    const file = fixturePath('empty.log');
    let queries: Map<string, Query>;

    before(async () => {
      queries = await analyzeLog(file);
    });

    it('should return an empty map', () => {
      expect(queries, stringifyMap(queries)).to.be.empty;
    });
  });

  describe('Single query found', () => {
    const file = fixturePath('singleQuery.log');
    let queries: Map<string, Query>;

    before(async () => {
      queries = await analyzeLog(file);
    });

    it('should not return an empty map', () => {
      expect(queries, stringifyMap(queries)).to.not.be.empty;
    });

    it('should find the logged query', () => {
      expect(queries, stringifyMap(queries)).to.have.key('175');
    })
  });

  describe('Multiple queries found', () => {
    const file = fixturePath('multipleQuery.log');
    let queries: Map<string, Query>;

    before(async () => {
      queries = await analyzeLog(file);
    });

    it('should not return an empty map', () => {
      expect(queries, stringifyMap(queries)).to.not.be.empty;
    });

    it('should find the logged queries', () => {
      expect(queries, stringifyMap(queries)).to.have.keys('219', '221', '223');
    })
  });
});