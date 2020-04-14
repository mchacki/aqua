import 'mocha';

import {expect} from 'chai';

import {CallStack, Query, RequestEvent, ResponseEvent} from '../src/query';

const createTestStack =
    () => {
      return new CallStack();
    }

describe('Query object', () => {
  let testee = new Query();

  beforeEach(() => {
    testee = new Query();
  })

  describe('events', () => {
    it('non initially', () => {expect(testee.events()).to.be.empty});

    it('can add request event', () => {
      const evt = new RequestEvent('ReturnNode', 1, createTestStack());
      testee.addEvent(evt);
      const events = testee.events();
      expect(events).to.not.be.empty;
      expect(events).to.have.length(1);
      expect(events[0]).to.eql(evt);
    });

    it('can add many request events', () => {
      const evt1 = new RequestEvent('ReturnNode', 1, createTestStack());
      testee.addEvent(evt1);

      const evt2 = new RequestEvent('FilterNode', 2, createTestStack());
      testee.addEvent(evt2);

      const evt3 = new RequestEvent('SingletonNode', 3, createTestStack());
      testee.addEvent(evt3);

      const events = testee.events();
      expect(events).to.not.be.empty;
      expect(events).to.have.length(3);
      expect(events[0]).to.eql(evt1);
      expect(events[1]).to.eql(evt2);
      expect(events[2]).to.eql(evt3);
    });

    it('can add request and response event', () => {
      const reqEvt = new RequestEvent('ReturnNode', 1, createTestStack());
      testee.addEvent(reqEvt);


      const resEvt = new ResponseEvent('ReturnNode', 1, 'DONE', 0, 0, 0);
      testee.addEvent(resEvt);

      const events = testee.events();
      expect(events).to.not.be.empty;
      expect(events).to.have.length(2);
      expect(events[0]).to.eql(reqEvt);
      expect(events[1]).to.eql(resEvt);
    });

    it('can add many request and response events', () => {
      const reqevt1 = new RequestEvent('ReturnNode', 1, createTestStack());
      testee.addEvent(reqevt1);
      const reqevt2 = new RequestEvent('FilterNode', 2, createTestStack());
      testee.addEvent(reqevt2);
      const reqevt3 = new RequestEvent('SingletonNode', 3, createTestStack());
      testee.addEvent(reqevt3);

      const resevt3 = new ResponseEvent('SingletonNode', 3, 'DONE', 0, 0, 0);
      testee.addEvent(resevt3);
      const resevt2 = new ResponseEvent('FilterNode', 2, 'DONE', 0, 0, 0);
      testee.addEvent(resevt2);
      const resevt1 = new ResponseEvent('ReturnNode', 1, 'DONE', 0, 0, 0);
      testee.addEvent(resevt1);


      const events = testee.events();
      expect(events).to.not.be.empty;
      expect(events).to.have.length(6);
      expect(events[0]).to.eql(reqevt1);
      expect(events[1]).to.eql(reqevt2);
      expect(events[2]).to.eql(reqevt3);

      expect(events[3]).to.eql(resevt3);
      expect(events[4]).to.eql(resevt2);
      expect(events[5]).to.eql(resevt1);
    });

    describe('using a full query execution', () => {
      beforeEach(() => {
        for (let i = 0; i < 3; ++i) {
          const reqevt1 = new RequestEvent('ReturnNode', 1, createTestStack());
          testee.addEvent(reqevt1);
          const reqevt2 = new RequestEvent('FilterNode', 2, createTestStack());
          testee.addEvent(reqevt2);
          const reqevt3 =
              new RequestEvent('SingletonNode', 3, createTestStack());
          testee.addEvent(reqevt3);

          const resevt3 =
              new ResponseEvent('SingletonNode', 3, 'HASMORE', 0, 1000, 0);
          testee.addEvent(resevt3);
          const resevt2 =
              new ResponseEvent('FilterNode', 2, 'HASMORE', 0, 1000, 0);
          testee.addEvent(resevt2);
          const resevt1 =
              new ResponseEvent('ReturnNode', 1, 'HASMORE', 0, 1000, 0);
          testee.addEvent(resevt1);
        }
        {
          const reqevt1 = new RequestEvent('ReturnNode', 1, createTestStack());
          testee.addEvent(reqevt1);
          const reqevt2 = new RequestEvent('FilterNode', 2, createTestStack());
          testee.addEvent(reqevt2);
          const reqevt3 =
              new RequestEvent('SingletonNode', 3, createTestStack());
          testee.addEvent(reqevt3);

          const resevt3 =
              new ResponseEvent('SingletonNode', 3, 'DONE', 0, 1000, 0);
          testee.addEvent(resevt3);
          const resevt2 =
              new ResponseEvent('FilterNode', 2, 'DONE', 0, 1000, 0);
          testee.addEvent(resevt2);
          const resevt1 =
              new ResponseEvent('ReturnNode', 1, 'DONE', 0, 1000, 0);
          testee.addEvent(resevt1);
        }
      });

      it('can identify the used nodes', () => {
        const nodes = testee.nodes();
        expect(nodes).to.be.of.length(3);
      })
    })

    // TODO: Add error tests
  });
});