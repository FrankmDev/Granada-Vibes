import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED_PATH = resolve(__dirname, '../src/data/events/generated.json');

async function verifyImages() {
  const data = JSON.parse(readFileSync(GENERATED_PATH, 'utf-8'));
  
  const eventsWithImage = data.filter((e: any) => e.imageUrl);
  console.log(`Checking ${eventsWithImage.length} images...`);
  
  let failed = 0;
  
  // Use a concurrency limit
  const CONCURRENCY = 10;
  for (let i = 0; i < eventsWithImage.length; i += CONCURRENCY) {
    const batch = eventsWithImage.slice(i, i + CONCURRENCY);
    
    await Promise.all(batch.map(async (e: any) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        // Some servers reject HEAD requests, so we do a GET but abort once headers are received
        const res = await fetch(e.imageUrl, { 
          method: 'HEAD',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          // Fallback to GET just in case HEAD is not allowed
          const getRes = await fetch(e.imageUrl, { method: 'GET', signal: AbortSignal.timeout(10000) });
          if (!getRes.ok) {
            console.error(`❌ [${e.source}] Image failed (${getRes.status}): ${e.imageUrl}`);
            failed++;
          }
        }
      } catch (err: any) {
        console.error(`❌ [${e.source}] Request error for ${e.imageUrl}: ${err.message}`);
        failed++;
      }
    }));
  }
  
  console.log(`\nFinished checking. ${failed} images failed.`);
}

verifyImages();
