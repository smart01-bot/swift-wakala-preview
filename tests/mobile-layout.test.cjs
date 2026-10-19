const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const root=path.join(__dirname,'..');const read=n=>fs.readFileSync(path.join(root,n),'utf8');
test('preview is a full-height interactive app, not a framed phone',()=>{
 const css=read('minimal.css'),html=read('index.html');
 assert.match(css,/\.shell\{max-width:560px!important/);
 assert.match(css,/\.phone\{height:100dvh!important/);
 assert.match(css,/body\[data-preview="minimal"\]/);
 assert.match(css,/@media\(max-width:430px\)/);
 assert.doesNotMatch(html,/data-phone=|class="handset"/);
});
test('native welcome supports role selection and registration',()=>{
 const app=read('app.js');
 assert.match(app,/data-action="pick-role"/);
 assert.match(app,/data-action="continue-welcome"/);
 assert.match(app,/data-action="onboarding"/);
 assert.match(app,/next\.screen='splash'/);
 assert.match(app,/splashTimer=setTimeout/);
});
test('in-app light and dark remain available with reduced-motion support',()=>{
 const css=read('minimal.css'),app=read('app.js');
 assert.match(css,/\[data-action="theme"\]\{display:grid!important/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(app,/if\(embedded&&!minimal\)return/);
});