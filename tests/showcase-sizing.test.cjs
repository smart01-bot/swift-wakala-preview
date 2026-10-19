const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const css=fs.readFileSync(path.join(__dirname,'..','showcase.css'),'utf8');
test('wider handset widths retain reasonable modern phone proportions',()=>{
  assert.match(css,/width:clamp\(270px,30vw,350px\);aspect-ratio:9\/18\.7/);
  assert.match(css,/width:clamp\(238px,78vw,326px\)/);
  assert.match(css,/height:min\(745px,calc\(162vw \+ 62px\)\)/);
});
test('stacked phone gestures and accessibility remain enabled',()=>{
  assert.match(css,/\.handset\.is-front/);
  assert.match(css,/\.handset\.is-back/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});
test('typical mobile viewports fit enlarged handsets vertically',()=>{
  for(const width of [320,360,390,414,440]){
    const phoneWidth=width<=355?width*.78:Math.max(238,Math.min(width*.78,326));
    const stageHeight=Math.min(745,width*1.62+62);
    assert.ok(stageHeight-phoneWidth*18.7/9>=35,'screen fits at '+width+'px');
  }
});
