import { spawn } from 'child_process';
import path from 'path';

const scriptsDir = import.meta.dirname;

function formatDuration(startTime: number): string {
  const elapsedMs = Date.now() - startTime;
  return `${(elapsedMs / 1000).toFixed(1)}s`;
}

function run(script: string, label: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(scriptsDir, script);
    const startedAt = Date.now();
    const proc = spawn(process.execPath, ['--env-file=../.env', '--import', 'tsx', fullPath], {
      cwd: scriptsDir,
      stdio: 'inherit',
    });

    proc.on('close', (code, signal) => {
      if (code === 0) {
        console.log(`[OK] ${label} completado en ${formatDuration(startedAt)}.`);
        resolve();
      } else if (signal) {
        reject(new Error(`Script ${script} interrumpido por la senal ${signal}`));
      } else {
        reject(new Error(`Script ${script} salió con código ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

async function main(): Promise<void> {
  try {
    console.log('>>> LIMPIANDO eventos pasados...\n');
    await run('clean-events.ts', 'Limpieza');

    console.log('\n>>> BUSCANDO nuevos eventos...\n');
    await run('fetch-events.ts', 'Fetch');

    console.log('\n[OK] Sincronización completada.');
  } catch (err) {
    console.error('\n[FAIL] Error durante la sincronización:', err);
    process.exit(1);
  }
}

main();
