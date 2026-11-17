import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
async function check(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await check(path);
    else if (/ORB-001|ORB-002|orb-body|SYS-001|sys001|devtools|Vývojový tester|Provést jeden krok/.test(await readFile(path, 'utf8'))) {
      throw new Error(`Tester leaked into production: ${path}`);
    }
  }
}
await check('dist');
process.stdout.write('Production artifact: no tester code or fixtures.\n');
