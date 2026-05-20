#!/usr/bin/env bun
import { spawn } from 'node:child_process';
import path from 'node:path';

const scriptsDir = import.meta.dirname;
const rootDir = path.resolve(scriptsDir, '..');

function formatDuration(startTime: number): string {
  const elapsedMs = Date.now() - startTime;
  return `${(elapsedMs / 1000).toFixed(1)}s`;
}

function runBunScript(script: string, label: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(scriptsDir, script);
    const startedAt = Date.now();
    const proc = spawn('bun', [fullPath], {
      cwd: rootDir,
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
    await runBunScript('clean-events.ts', 'Limpieza');

    console.log('\n>>> BUSCANDO nuevos eventos...\n');
    await runBunScript('fetch-events.ts', 'Fetch');

    console.log('\n>>> OPTIMIZANDO imagenes de eventos...\n');
    await runBunScript('optimize-event-images.ts', 'Optimización de imágenes');

    console.log('\n>>> GENERANDO HTML y sitemap actualizados...\n');
    await runCommand('bun', ['run', 'build:static'], 'Build', rootDir);

    console.log('\n>>> VERIFICANDO sitemap de eventos...\n');
    await runBunScript('verify-event-sitemap.ts', 'Verificación de sitemap');

    console.log('\n[OK] Sincronización completada.');
  } catch (err) {
    console.error('\n[FAIL] Error durante la sincronización:', err);
    process.exit(1);
  }
}

main();
