const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const dir = path.join(__dirname,'..');
const app = fs.readFileSync(path.join(dir,'app.js'),'utf8');
const css = fs.readFileSync(path.join(dir,'mobile.css'),'utf8');
const html = fs.readFileSync(path.join(dir,'index.html'),'utf8');
test('mobile app comes before long-form guidance', () => {
  assert.match(css,/\.pitch\{display:none\}/);
  assert.match(app,/class="mobile-stage"/);
  assert.match(app,/class="mobile-more"/);
  assert.match(app,/class="mobile-role-picker"/);
  assert.match(app,/data-action="onboarding"/);
  assert.match(app,/data-action="reset"/);
  assert.match(css,/\.phone\{height:calc\(100svh - 126px\)/);
});
test('mobile view removes duplicate controls and app marketing', () => {
  assert.match(css,/\.device-caption\{display:none\}/);
  assert.match(css,/\.statusline\{display:none\}/);
  assert.doesNotMatch(app,/Good afternoon, Amina/);
  assert.doesNotMatch(app,/Your networks\.<br\/>One clear workflow/);
  assert.match(app,/Need to move float/);
  assert.match(app,/Review incoming requests/);
  assert.match(html,/mobile\.css\?v=/);
  assert.doesNotMatch(html,/<video|\.mp4/);
});
