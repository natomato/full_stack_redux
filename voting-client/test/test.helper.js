import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiEnzyme from 'chai-enzyme';

/*
  Note: enzyme depends on a dom to call render or mount (not for shallow)
  I chose to keep using render so that when a simple component grows
  and start rendering subcomponents it wont break the test

  From the tutorial author:
  We need a bit of setup code for jsdom before it's ready for React to use.
  We essentially need to create jsdom versions of the document and window
  objects that would normally be provided by the web browser. Then we need to
  put them on the global object, so that they will be discovered by React when
  it accesses document or window. We can set up a test helper file for this kind
  of setup code:
*/
const doc = jsdom.jsdom();
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach( key => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});


chai.use(chaiImmutable);
chai.use(chaiEnzyme());
