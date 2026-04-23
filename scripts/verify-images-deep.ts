import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED_PATH = resolve(__dirname, '../src/data/events/generated.json');

async function checkImagePayloads() {
  const data = JSON.parse(readFileSync(GENERATED_PATH, 'utf-8'));
  const eventsWithImage = data.filter((e: any) => e.imageUrl);
  
  console.log(`Deep checking ${eventsWithImage.length} images...`);
  
  let failed = 0;
  let htmlReturned = 0;
  let tooSmall = 0;
  
  for (const e of eventsWithImage) {
    try {
      const res = await fetch(e.imageUrl, { 
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!res.ok) {
        console.log(`❌ [${e.source}] HTTP ${res.status}: ${e.imageUrl}`);
        failed++;
        continue;
      }
      
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        console.log(`❌ [${e.source}] Returned HTML instead of image: ${e.imageUrl}`);
        htmlReturned++;
        continue;
      }
      
      const buffer = await res.arrayBuffer();
      if (buffer.byteLength < 1024) { // Less than 1KB is highly suspicious
        console.log(`⚠ [${e.source}] Very small image (${buffer.byteLength} bytes): ${e.imageUrl}`);
        tooSmall++;
      }
    } catch (err: any) {
      console.log(`❌ [${e.source}] Fetch failed: ${e.imageUrl} - ${err.message}`);
      failed++;
    }
  }
  
  console.log(`\nResults: ${failed} failed, ${htmlReturned} returned HTML, ${tooSmall} suspiciously small.`);
}

checkImagePayloads();
