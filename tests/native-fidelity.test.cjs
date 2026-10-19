const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');
test('native wing mark and app boot route remain in preview',()=>{
  const app=read('app.js');
  assert.match(app,/M16 55C25 39 27 26 44 19/);
  assert.match(app,/let s=makeExperience\(\)/);
  assert.match(app,/next\.screen='splash'/);
  assert.match(app,/splashTimer=setTimeout/);
  assert.match(app,/Continue as/);
});
test('request matches source-destination-amount review layout',()=>{
  const app=read('app.js'),css=read('minimal.css');
  assert.match(app,/native-route-panel/);
  assert.match(app,/Collect from/);
  assert.match(app,/Pay out to/);
  assert.match(app,/native-amount/);
  assert.match(app,/Swift Wakala fee/);
  assert.match(app,/id="new-request"/);
  assert.match(css,/\.native-request-footer/);
});
test('history filter and profile controls remain interactive',()=>{
  const app=read('app.js');
  assert.match(app,/data-history-select/);
  assert.match(app,/ui\.historyFilter=ev\.target\.value/);
  assert.match(app,/native-profile-head/);
  assert.match(app,/data-action="sign-out-demo"/);
});
test('no outer portfolio marketing site or fake handset',()=>{
  const html=read('index.html');
  assert.match(html,/<body data-preview="minimal">/);
  assert.doesNotMatch(html,/class="showcase"|<iframe|class="handset"|\.mp4|role="banner"/i);
  assert.match(html,/app\.js/);
  assert.match(html,/model\.js/);
});
