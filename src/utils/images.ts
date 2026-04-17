import type { ImageMetadata } from 'astro';

import imgAlbaicinPanorama from '@assets/images/routes/albaicin-panorama.jpg';
import imgAlcaiceria from '@assets/images/routes/alcaiceria.jpg';
import imgAlhambraAtardecer from '@assets/images/routes/alhambra-atardecer.jpg';
import imgAlhambraJardines from '@assets/images/routes/alhambra-jardines.jpg';
import imgAlhambraSanNicolas from '@assets/images/routes/alhambra-san-nicolas.jpg';
import imgCapillaReal from '@assets/images/routes/capilla-real.jpg';
import imgCatedralGranada from '@assets/images/routes/catedral-granada.jpg';
import imgMiradorSanNicolas from '@assets/images/routes/mirador-san-nicolas.jpg';
import imgPaseoTristes from '@assets/images/routes/paseo-tristes.jpg';
import imgSacromonteDarro from '@assets/images/routes/sacromonte-darro.jpg';
import imgTapasGranada from '@assets/images/routes/tapas-granada.jpg';

const localImageMap: Record<string, ImageMetadata> = {
  '/images/routes/albaicin-panorama.jpg': imgAlbaicinPanorama,
  '/images/routes/alcaiceria.jpg': imgAlcaiceria,
  '/images/routes/alhambra-atardecer.jpg': imgAlhambraAtardecer,
  '/images/routes/alhambra-jardines.jpg': imgAlhambraJardines,
  '/images/routes/alhambra-san-nicolas.jpg': imgAlhambraSanNicolas,
  '/images/routes/capilla-real.jpg': imgCapillaReal,
  '/images/routes/catedral-granada.jpg': imgCatedralGranada,
  '/images/routes/mirador-san-nicolas.jpg': imgMiradorSanNicolas,
  '/images/routes/paseo-tristes.jpg': imgPaseoTristes,
  '/images/routes/sacromonte-darro.jpg': imgSacromonteDarro,
  '/images/routes/tapas-granada.jpg': imgTapasGranada,
};

export type ResolvedImage =
  | { type: 'import'; image: ImageMetadata }
  | { type: 'remote'; url: string };

export function resolveImage(src: string): ResolvedImage | null {
  if (localImageMap[src]) {
    return { type: 'import', image: localImageMap[src] };
  }

  if (src.startsWith('http://') || src.startsWith('https://')) {
    return { type: 'remote', url: src };
  }

  if (src.startsWith('/')) {
    return { type: 'remote', url: src };
  }

  return null;
}

export function isLocalResolvable(src: string): boolean {
  return src in localImageMap;
}