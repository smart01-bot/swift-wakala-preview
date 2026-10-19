const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const read=name=>fs.readFileSync(path.join(__dirname,'..',name),'utf8');

test('outer showcase is white with monochrome controls and no ambiance',()=>{
  const css=read('showcase.css');
  assert.match(css,/--paper:#ffffff/);
  assert.match(css,/--ink:#202020/);
  assert.match(css,/--accent:#242424/);
  assert.match(css,/\.stage-letter\{display:none;/);
  assert.match(css,/\.device\{[^}]*box-shadow:none/);
  assert.doesNotMatch(css,/#3d51d5|#374dd4|#4054d4|#f4f2f0|#ecefe9|#35674f|#e4e6f1/i);
  assert.doesNotMatch(css,/radial-gradient|linear-gradient|filter:blur|backdrop-filter/i);
});

test('embedded dark and light phones are neutral not cobalt-tinted',()=>{
  const css=read('experience.css');
  assert.match(css,/body\[data-theme="light"\]\{--app-bg:#ffffff/);
  assert.match(css,/body\[data-theme="dark"\]\{--app-bg:#0d0d0e/);
  assert.match(css,/--app-cta:#252525/);
  assert.match(css,/--app-cta:#f5f5f5/);
  assert.doesNotMatch(css,/#334bc7|#e1e7ff|#1b2345|#0b0e19/i);
});

test('both public phone entrypoints load refreshed neutral styling',()=>{
  assert.match(read('index.html'),/showcase\.css\?v=20261019-neutral-3/);
  assert.match(read('experience.html'),/experience\.css\?v=20261019-neutral-3/);
  assert.equal((read('index.html').match(/<iframe\b/g)||[]).length,2);
});
