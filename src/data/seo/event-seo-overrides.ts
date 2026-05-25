import type { LocalizedText } from '@types';

interface EventSeoOverride {
  title: LocalizedText;
  description: LocalizedText;
  h1: LocalizedText;
}

export const eventSeoOverrides: Record<string, EventSeoOverride> = {
  'pablo-alboran': {
    title: {
      es: 'Pablo Alborán Granada 26 junio: entradas Plaza de Toros',
      en: 'Pablo Alborán Granada 26 June: tickets Plaza de Toros',
    },
    description: {
      es: 'Pablo Alborán actúa en la Plaza de Toros de Granada el 26 de junio de 2026. Consulta entradas, horario, recinto y planes cerca del concierto.',
      en: 'Pablo Alborán plays Plaza de Toros Granada on 26 June 2026. Check tickets, time, venue details and nearby plans before the concert.',
    },
    h1: {
      es: 'Pablo Alborán en Granada',
      en: 'Pablo Alborán in Granada',
    },
  },
  sting: {
    title: {
      es: 'Sting Granada 26 junio: concierto y entradas',
      en: 'Sting Granada 26 June: concert and tickets',
    },
    description: {
      es: 'Sting actúa en Granada el 26 de junio de 2026. Consulta fecha, entradas, recinto, horario y próximos conciertos destacados en la ciudad.',
      en: 'Sting plays Granada on 26 June 2026. Check the date, tickets, venue, time and more major concerts in the city.',
    },
    h1: {
      es: 'Sting en Granada',
      en: 'Sting in Granada',
    },
  },
  '1001-musicas-caixabank-sting': {
    title: {
      es: 'Sting Granada 15 julio: entradas 1001 Músicas',
      en: 'Sting Granada 15 July: 1001 Músicas tickets',
    },
    description: {
      es: 'Sting llega a 1001 Músicas en Granada el 15 de julio de 2026. Consulta entradas, horario, recinto y detalles del concierto.',
      en: 'Sting comes to 1001 Músicas in Granada on 15 July 2026. Check tickets, time, venue and concert details.',
    },
    h1: {
      es: 'Sting en 1001 Músicas Granada',
      en: 'Sting at 1001 Músicas Granada',
    },
  },
  'silvana-estrada': {
    title: {
      es: 'Silvana Estrada Granada 2026: entradas y fecha',
      en: 'Silvana Estrada Granada 2026: tickets and date',
    },
    description: {
      es: 'Silvana Estrada actúa en el Palacio de Congresos de Granada el 5 de junio de 2026. Consulta entradas, horario y detalles del concierto.',
      en: 'Silvana Estrada plays Palacio de Congresos Granada on 5 June 2026. Check tickets, time and concert details.',
    },
    h1: {
      es: 'Silvana Estrada en Granada',
      en: 'Silvana Estrada in Granada',
    },
  },
  'silvana-estrada-vendran-suaves-lluvias': {
    title: {
      es: 'Silvana Estrada Granada: Vendrán suaves lluvias',
      en: 'Silvana Estrada Granada: Vendrán suaves lluvias',
    },
    description: {
      es: 'Silvana Estrada presenta Vendrán suaves lluvias en Granada el 5 de junio de 2026. Consulta horario, recinto y detalles del concierto.',
      en: 'Silvana Estrada presents Vendrán suaves lluvias in Granada on 5 June 2026. Check time, venue and concert details.',
    },
    h1: {
      es: 'Silvana Estrada en Granada',
      en: 'Silvana Estrada in Granada',
    },
  },
  'miguel-poveda': {
    title: {
      es: 'Miguel Poveda Granada 2026: entradas y fecha',
      en: 'Miguel Poveda Granada 2026: tickets and date',
    },
    description: {
      es: 'Miguel Poveda actúa en Granada el 13 de junio de 2026. Consulta entradas, horario, recinto y más conciertos flamencos en la ciudad.',
      en: 'Miguel Poveda plays Granada on 13 June 2026. Check tickets, time, venue and more flamenco concerts in the city.',
    },
    h1: {
      es: 'Miguel Poveda en Granada',
      en: 'Miguel Poveda in Granada',
    },
  },
  'tarzan-el-musical-by-theatre-properties': {
    title: {
      es: 'Tarzán El Musical Granada: fecha y entradas',
      en: 'Tarzan The Musical Granada: date and tickets',
    },
    description: {
      es: 'Tarzán El Musical llega al Palacio de Congresos de Granada el 11 de julio de 2026. Consulta entradas, horario y detalles del espectáculo.',
      en: 'Tarzan The Musical comes to Palacio de Congresos Granada on 11 July 2026. Check tickets, time and show details.',
    },
    h1: {
      es: 'Tarzán El Musical en Granada',
      en: 'Tarzan The Musical in Granada',
    },
  },
  'concierto-jazz-plaza-trinidad': {
    title: {
      es: 'Festival de Jazz Granada 2026: gratis en Plaza Trinidad',
      en: 'Granada Jazz Festival 2026: free at Plaza Trinidad',
    },
    description: {
      es: 'Festival de jazz gratuito en Plaza de la Trinidad, Granada, del 15 al 17 de julio de 2026. Consulta fechas, horarios y programación.',
      en: 'Free jazz festival at Plaza de la Trinidad, Granada, from 15 to 17 July 2026. Check dates, times and programme.',
    },
    h1: {
      es: 'Festival de Jazz en Plaza de la Trinidad',
      en: 'Jazz Festival at Plaza de la Trinidad',
    },
  },
  'noche-flamenca-tablaos': {
    title: {
      es: 'Flamenco en Sacromonte Granada: entradas y reserva',
      en: 'Flamenco in Sacromonte Granada: tickets and booking',
    },
    description: {
      es: 'Reserva una noche flamenca en una cueva del Sacromonte, Granada. Espectáculo de cante, baile y guitarra con opción de cena.',
      en: 'Book a flamenco night in a Sacromonte cave in Granada. Singing, dance and guitar show with optional dinner.',
    },
    h1: {
      es: 'Noche flamenca en el Sacromonte',
      en: 'Flamenco night in Sacromonte',
    },
  },
};
