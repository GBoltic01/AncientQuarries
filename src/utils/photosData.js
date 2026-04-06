// Eagerly import all quarry images so Vite processes and hashes them
const allImages = import.meta.glob('../data/img/*.jpg', { eager: true })

// Captions keyed by filename stem (matches photos.csv fid column)
const captions = {
  '1':   'Visible flat chisel marks in the locus 7, Dardagani quarry (Source: photo by Maja Lavrič, courtesy of Prof. Bojan Djurić).',
  '1_1': 'Preserved blocks, extraction traces and unfinished products (Source: photo by Maja Lavrič, courtesy of Prof. Bojan Djurić).',
  '3':   'The quarry at Podused-Vrapće, likely exploited for Andautonia and nearby settlements (Source: Ines Ferjan, September 2024).',
  '4':   'The quarry at Hrastovica (Source: Migotti et al. 2018, Fig. 3. 2).',
  '5':   'The Žuti kamen quarry at Topusko (Source: Migotti et al. 2018, Fig. 3.5).',
  '22':  'Green schists quarried at Ram (Source: Nikolić 2013, Fig. 1.).',
  '39':  'Traces of ancient exploitation at Dračevica quarry (Source: Basotova 2019, Fig. 4).',
  '45':  'Visible transition from the dolomite Sivec marble (grey) to the calcite Pletvar marble (yellow) (Source: Prochaska 2013, Fig. 3).',
  '46':  'Visible pick traces on the calcite marble from the Pletvar quarry (Source: Prochaska 2013, Fig. 11).',
  '55':  'Remains of the onyx marble at quarry in Peja (Source: Dobruna-Salihu 2015, Fig. 8).',
}

function imgUrl(stem) {
  const mod = allImages[`../data/img/${stem}.jpg`]
  return mod ? mod.default : null
}

/**
 * Returns an array of { src, caption } for a given GeoJSON fid.
 * Returns [] if no photos exist for that fid.
 */
export function getPhotosForFid(fid) {
  const photos = []
  const main = imgUrl(String(fid))
  if (main) photos.push({ src: main, caption: captions[String(fid)] ?? '' })

  // Additional photos: fid_1, fid_2, …
  let n = 1
  while (true) {
    const stem = `${fid}_${n}`
    const url = imgUrl(stem)
    if (!url) break
    photos.push({ src: url, caption: captions[stem] ?? '' })
    n++
  }
  return photos
}
