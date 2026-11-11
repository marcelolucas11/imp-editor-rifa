'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const u = require('../electron/updater');

test('compara versões semver', () => {
  assert.equal(u.compareVersions('1.0.0', '1.0.0'), 0);
  assert.equal(u.compareVersions('1.0.1', '1.0.0'), 1);
  assert.equal(u.compareVersions('1.2.0', '1.10.0'), -1);
  assert.equal(u.compareVersions('v2.0.0', '1.99.99'), 1);
  assert.equal(u.compareVersions('1.0.0-beta.1', '1.0.0'), -1);
});

test('isNewer só é true para versão maior', () => {
  assert.equal(u.isNewer('1.1.0', '1.0.0'), true);
  assert.equal(u.isNewer('1.0.0', '1.0.0'), false);
  assert.equal(u.isNewer('0.9.0', '1.0.0'), false);
});

test('versão inválida lança erro', () => {
  assert.throws(() => u.compareVersions('abc', '1.0.0'));
});

test('parseChecksums lê formato shasum', () => {
  const h = 'a'.repeat(64);
  assert.deepEqual(u.parseChecksums(`${h}  Editor-Rifa-mac.zip\n${'b'.repeat(64)} *Editor-Rifa-mac.dmg\n`), {
    'Editor-Rifa-mac.zip': h,
    'Editor-Rifa-mac.dmg': 'b'.repeat(64)
  });
});

test('só aceita hosts do GitHub via https', () => {
  assert.equal(u.isAllowedHost('https://github.com/x/y/releases/download/v1/a.zip'), true);
  assert.equal(u.isAllowedHost('https://objects.githubusercontent.com/abc'), true);
  assert.equal(u.isAllowedHost('http://github.com/x'), false);
  assert.equal(u.isAllowedHost('https://github.com.evil.com/x'), false);
  assert.equal(u.isAllowedHost('https://evil.com/github.com'), false);
});

test('summarizeRelease encontra os assets', () => {
  const r = u.summarizeRelease({
    tag_name: 'v1.2.3', body: 'notas', html_url: 'https://github.com/x',
    assets: [{ name: 'Editor-Rifa-mac.zip', size: 5 }, { name: 'SHA256SUMS.txt' }, { name: 'Editor-Rifa-mac.dmg' }]
  });
  assert.equal(r.version, '1.2.3');
  assert.equal(r.zip.name, 'Editor-Rifa-mac.zip');
  assert.equal(r.sums.name, 'SHA256SUMS.txt');
  assert.throws(() => u.summarizeRelease({ tag_name: 'latest', assets: [] }));
});
