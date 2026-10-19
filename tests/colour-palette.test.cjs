const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const root=path.join(__dirname,'..');const read=n=>fs.readFileSync(path.join(root,n),'utf8');
test('homepage has only the app: no mock devices, stage, or pitch',()=>{
 const html=read('index.html');
 assert.match(html,/<body data-preview="minimal"><div id="root"><\/div>/);
 assert.doesNotMatch(html,/<iframe\b|phone-stage|phone-sticker|dual-phone|showcase\.css|showcase\.js|<video\b/i);
 assert.match(html,/minimal\.css/);
 assert.match(html,/model\.js/);
 assert.match(html,/app\.js/);
});
test('styles use real native silver and AMOLED tokens',()=>{
 const css=read('minimal.css');
 assert.match(css,/#EEF0F2/);
 assert.match(css,/#16191D/);
 assert.match(css,/#000000/);
 assert.match(css,/#F5F5F5/);
 assert.match(css,/#303B49/);
 assert.match(css,/\.native-main-hero/);
});
test('app preview contains original Swift brand and interactions',()=>{
 const app=read('app.js');
 assert.match(app,/M16 55C25 39 27 26 44 19/);
 assert.match(app,/handsetWelcome/);
 assert.match(app,/pick-role/);
 assert.match(app,/continue-welcome/);
 assert.match(app,/native-activity-chart/);
 assert.match(app,/native-main-hero/);
 assert.match(app,/if\(embedded&&!minimal\)return/);
});