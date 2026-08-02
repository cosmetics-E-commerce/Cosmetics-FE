import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const backendRoot = resolve(projectRoot, process.env.CONTRACTS_SOURCE || '../Cosmetics-BE');
const sourceRoot = join(backendRoot, 'src/contracts');
const builtRoot = join(backendRoot, 'dist-contracts');
const destination = join(projectRoot, 'vendor/cosmetics-contracts');
const metadataPath = join(destination, '.contract-sync.json');

async function filesUnder(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(path));
    else if (!entry.name.endsWith('.spec.ts')) files.push(path);
  }
  return files;
}

async function sourceDigest() {
  const hash = createHash('sha256');
  for (const path of await filesUnder(sourceRoot)) {
    hash.update(path.slice(sourceRoot.length));
    hash.update(await readFile(path));
  }
  return hash.digest('hex');
}

const digest = await sourceDigest();
if (process.argv.includes('--check')) {
  const metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
  if (metadata.sourceDigest !== digest) {
    throw new Error('The vendored @cosmetics/contracts artifact is stale. Run pnpm contracts:sync.');
  }
  console.log(`@cosmetics/contracts is synchronized (${digest.slice(0, 12)}).`);
  process.exit(0);
}

execFileSync('corepack', ['pnpm', 'contracts:build'], { cwd: backendRoot, stdio: 'inherit' });
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(builtRoot, destination, { recursive: true });
const packageJson = JSON.parse(await readFile(join(destination, 'package.json'), 'utf8'));
await writeFile(metadataPath, `${JSON.stringify({
  package: packageJson.name,
  version: packageJson.version,
  sourceDigest: digest,
}, null, 2)}\n`);
console.log(`Synchronized ${packageJson.name}@${packageJson.version} (${digest.slice(0, 12)}).`);
