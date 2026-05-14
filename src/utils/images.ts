import type { ImageMetadata } from 'astro';

// ── ROUTES ───────────────────────────────────────────────────────────
import imgArtesanos from '@assets/images/routes/artesanos.avif';
import imgBosqueAlhambra from '@assets/images/routes/bosque-alhambra.avif';
import imgEspartoRealejo from '@assets/images/routes/esparto-realejo.avif';
import imgFlamenco from '@assets/images/routes/flamenco.avif';
import imgFotoSacromonte from '@assets/images/routes/foto-sacromonte.avif';
import imgGranadaArabe from '@assets/images/routes/granada-arabe.avif';
import imgMiradores from '@assets/images/routes/miradores.avif';
import imgMonumental from '@assets/images/routes/monumental.avif';
import imgRealejo from '@assets/images/routes/realejo.avif';
import imgReyesCatolicos from '@assets/images/routes/reyes-catolicos.avif';
import imgRioDarro from '@assets/images/routes/rio-darro.avif';
import imgSacromonteFlamenco from '@assets/images/routes/sacromonte-flamenco.avif';
import imgTapeo from '@assets/images/routes/tapeo.avif';
import imgVermutAlbaicin from '@assets/images/routes/vermut-albaicin.avif';

// ── BLOG ─────────────────────────────────────────────────────────────
import imgAlbaicinPie from '@assets/images/blog/albaicin-pie.avif';
import imgAlhambraEntradas from '@assets/images/blog/alhambra-entradas.avif';
import imgAntesDeLlegar from '@assets/images/blog/antes-de-llegar.avif';
import imgFinDeSemana from '@assets/images/blog/fin-de-semana.avif';
import imgFlamencoGuia from '@assets/images/blog/flamenco-guia.avif';
import imgGranadaGratis from '@assets/images/blog/granada-gratis.avif';
import imgGranadaUnDia from '@assets/images/blog/granada-un-dia.avif';
import imgMiradoresGuia from '@assets/images/blog/miradores-guia.avif';
import imgSierraNevada from '@assets/images/blog/sierra-nevada.avif';
import imgTapasGratis from '@assets/images/blog/tapas-gratis.avif';

const localImageMap: Record<string, ImageMetadata> = {
  // routes
  '/images/routes/artesanos.avif': imgArtesanos,
  '/images/routes/bosque-alhambra.avif': imgBosqueAlhambra,
  '/images/routes/esparto-realejo.avif': imgEspartoRealejo,
  '/images/routes/flamenco.avif': imgFlamenco,
  '/images/routes/foto-sacromonte.avif': imgFotoSacromonte,
  '/images/routes/granada-arabe.avif': imgGranadaArabe,
  '/images/routes/miradores.avif': imgMiradores,
  '/images/routes/monumental.avif': imgMonumental,
  '/images/routes/realejo.avif': imgRealejo,
  '/images/routes/reyes-catolicos.avif': imgReyesCatolicos,
  '/images/routes/rio-darro.avif': imgRioDarro,
  '/images/routes/sacromonte-flamenco.avif': imgSacromonteFlamenco,
  '/images/routes/tapeo.avif': imgTapeo,
  '/images/routes/vermut-albaicin.avif': imgVermutAlbaicin,

  // blog
  '/images/blog/albaicin-pie.avif': imgAlbaicinPie,
  '/images/blog/alhambra-entradas.avif': imgAlhambraEntradas,
  '/images/blog/antes-de-llegar.avif': imgAntesDeLlegar,
  '/images/blog/fin-de-semana.avif': imgFinDeSemana,
  '/images/blog/flamenco-guia.avif': imgFlamencoGuia,
  '/images/blog/granada-gratis.avif': imgGranadaGratis,
  '/images/blog/granada-un-dia.avif': imgGranadaUnDia,
  '/images/blog/miradores-guia.avif': imgMiradoresGuia,
  '/images/blog/sierra-nevada.avif': imgSierraNevada,
  '/images/blog/tapas-gratis.avif': imgTapasGratis,
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
