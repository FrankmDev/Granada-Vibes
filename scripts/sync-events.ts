#!/usr/bin/env -S node --env-file=.env --import tsx
import { spawn } from 'child_process';
import path from 'path';

const scriptsDir = import.meta.dirname;
const rootDir = path.resolve(scriptsDir, '..');

function formatDuration(startTime: number): string {
  const elapsedMs = Date.now() - startTime;
  return `${(elapsedMs / 1000).toFixed(1)}s`;
}

function runNodeScript(script: string, label: string): Promise<void> {
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

function runCommand(command: string, args: string[], label: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const proc = spawn(command, args, {
      cwd,
      stdio: 'inherit',
    });

    proc.on('close', (code, signal) => {
      if (code === 0) {
        console.log(`[OK] ${label} completado en ${formatDuration(startedAt)}.`);
        resolve();
      } else if (signal) {
        reject(new Error(`Comando ${command} interrumpido por la senal ${signal}`));
      } else {
        reject(new Error(`Comando ${command} salió con código ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

async function main(): Promise<void> {
  try {
    console.log('>>> LIMPIANDO eventos pasados...\n');
    await runNodeScript('clean-events.ts', 'Limpieza');

    console.log('\n>>> BUSCANDO nuevos eventos...\n');
    await runNodeScript('fetch-events.ts', 'Fetch');

    console.log('\n>>> LIMPIANDO de nuevo tras la sincronización...\n');
    await runNodeScript('clean-events.ts', 'Limpieza final');

    console.log('\n>>> GENERANDO HTML y sitemap actualizados...\n');
    await runCommand('npm', ['run', 'build'], 'Build', rootDir);

    console.log('\n>>> VERIFICANDO sitemap de eventos...\n');
    await runNodeScript('verify-event-sitemap.ts', 'Verificación de sitemap');

    console.log('\n[OK] Sincronización completada.');
  } catch (err) {
    console.error('\n[FAIL] Error durante la sincronización:', err);
    process.exit(1);
  }
}

main();
