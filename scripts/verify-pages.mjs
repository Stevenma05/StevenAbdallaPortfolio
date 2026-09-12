import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist/client');
const domain = 'www.stevenabdalla.com';
for (const file of ['index.html', 'index.rsc', 'robots.txt', 'sitemap.xml', 'CNAME', '.nojekyll',
  'Steven-Abdalla-Resume.pdf', 'robotics-robot.jpg', 'robotics-competition.jpg']) {
  assert(existsSync(path.join(output, file)), `Missing static file: ${file}`);
}
assert.equal(readFileSync(path.join(output, 'CNAME'), 'utf8').trim(), domain);
const html = readFileSync(path.join(output, 'index.html'), 'utf8');
assert(html.includes('STEVEN.EXE'), 'The homepage was not rendered');
assert(html.includes(`https://${domain}`), 'Homepage metadata has the wrong domain');
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)[^"]*"/g)) {
  const file = path.join(output, decodeURIComponent(match[1]));
  assert(existsSync(file), `Broken local asset in the homepage: ${match[1]}`);
}
for (const file of ['robots.txt', 'sitemap.xml']) {
  assert(readFileSync(path.join(output, file), 'utf8').includes(`https://${domain}`), `${file} has the wrong domain`);
}
for (const file of ['Steven-Abdalla-Resume.pdf', 'robotics-robot.jpg', 'robotics-competition.jpg']) {
  assert(statSync(path.join(output, file)).size > 0, `Empty asset: ${file}`);
  assert(readFileSync(path.join(output, file)).equals(readFileSync(path.join('public', file))), `Asset differs from original: ${file}`);
}
console.log('GitHub Pages output verified: rendered homepage, local assets, domain, sitemap, resume, and robotics photos.');
