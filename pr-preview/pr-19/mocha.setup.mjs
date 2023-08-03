import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
global.expect = chai.expect;

import * as td from 'testdouble';
global.td = td;

export const mochaHooks = {
  afterEach() {
    td.reset();
  }
};