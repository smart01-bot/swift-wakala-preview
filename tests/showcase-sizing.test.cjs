const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const root=path.join(__dirname,'..');const read=n=>fs.readFileSync(path.join(root,n),'utf8');
test('desktop keeps the app readable without drawing a fake device',()=>{
 const css=read('minimal.css');
 assert.match(css,/max-width:560px!important/);
 assert.match(css,/margin:auto!important/);
 assert.doesNotMatch(css,/border:7px solid|box-shadow:0 19px 56px|\.stage-letter/);
});
test('request, queue and approval screens are retained',()=>{
 const app=read('app.js');
 for(const name of ['function agentRequest','function agentHistory','function mainQueue','function mainApprovals','function onboarding'])assert.ok(app.includes(name),name);
});
test('browser preview does not send real wallet transfers',()=>{
 const html=read('index.html'),js=read('app.js');
 assert.doesNotMatch(html,/<form|<iframe|\.mp4/);
 assert.match(js,/M\.submitRequest/);
 assert.match(js,/Simulated workflow/);
});