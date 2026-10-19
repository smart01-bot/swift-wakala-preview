const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const dir=path.join(__dirname,'..');
const get=name=>fs.readFileSync(path.join(dir,name),'utf8');

test('public showcase loads two independent phone iframes with original demo state',()=>{
  const page=get('index.html');
  assert.equal((page.match(/<iframe\b/g)||[]).length,2);
  assert.match(page,/data-phone="dark"/);
  assert.match(page,/data-phone="light"/);
  assert.match(page,/experience\.html\?handset=1&amp;theme=dark/);
  assert.match(page,/experience\.html\?handset=1&amp;theme=light/);
  assert.doesNotMatch(page,/<video|\.mp4/);
});

test('handset splash boots into the original interactive app',()=>{
  const app=get('app.js'), experience=get('experience.html'),css=get('experience.css');
  assert.match(app,/function splash\(\)/);
  assert.match(app,/splashTimer=setTimeout/);
  assert.match(app,/if\(s\.screen==='welcome'&&embedded\)/);
  assert.match(app,/const next=M\.makeSeed\(\)/);
  assert.match(app,/next\.theme=assignedTheme/);
  assert.match(experience,/src="\.\/model\.js"/);
  assert.match(experience,/src="\.\/app\.js\?v=/);
  assert.match(css,/height:100dvh!important/);
});

test('swiping, tapping and keyboard controls preserve each handset',()=>{
  const js=get('showcase.js'),css=get('showcase.css');
  assert.match(js,/function focusPhone\(/);
  assert.match(js,/swift-gesture/);
  assert.match(js,/event\.source!==frames\[active\]/);
  assert.match(js,/ArrowRight/);
  assert.match(js,/setAttribute\('aria-pressed'/);
  assert.match(css,/@media\(max-width:440px\)/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});

test('synthetic data remains isolated from providers',()=>{
  const engine=get('app.js'),model=get('model.js');
  assert.match(engine,/makeExperience/);
  assert.match(model,/makeSeed/);
  assert.doesNotMatch(engine,/https:\/\/.*(supabase|render\.com|firebase|api\.mpesa)/i);
});
