import 'mocha';
import {Query} from '../src/query';

describe('Query object', () => {
  let testee = new Query();

  beforeEach(() => {
    testee = new Query();
  })

  describe('events', () => {it('non initially', () => {testee.events()})})
});