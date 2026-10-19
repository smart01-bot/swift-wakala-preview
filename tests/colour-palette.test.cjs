const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
test('dual phone showcase uses porcelain graphite and cobalt, not green ambient colours',()=>{
 const css=read('showcase.css');
 assert.match(css,/--paper:#f4f2f0/);assert.match(css,/--ink:#222536/);assert.match(css,/--accent:#3d51d5/);
 assert.match(css,/background:var\(--accent\)/);assert.match(css,/\.handset\.is-front/);
 for(const old of ['#ecefe9','#244b39','#35674f','#274536','#e1e7df'])assert.ok(!css.includes(old),'legacy green '+old);
});
test('inner phone modes share blue accent without losing their identities',()=>{
 const css=read('experience.css');
 assert.match(css,/body\[data-theme="light"\]\{--app-bg:#f6f7fb/);
 assert.match(css,/body\[data-theme="dark"\]\{--app-bg:#0b0e19/);
 assert.match(css,/--app-cta:#334bc7/);
 assert.match(css,/--app-cta:#e1e7ff/);
});
test('published pages reference revised color scheme',()=>{
 assert.match(read('index.html'),/showcase\.css\?v=20261019-cobalt-2/);
 assert.match(read('experience.html'),/experience\.css\?v=20261019-cobalt-2/);
 assert.equal((read('index.html').match(/<iframe\b/g)||[]).length,2);
});
