import * as cheerio from 'cheerio';

fetch('https://conciertosengranada.es').then(r => r.text()).then(html => {
  const $ = cheerio.load(html);
  $('a[href^="/conciertos/"]').slice(0, 15).each((i, el) => {
    console.log('---', $(el).text().replace(/\n/g, ' ').substring(0, 50));
    console.log('GRANDPARENT CLASS:', $(el).parent().parent().attr('class'));
  });
});
