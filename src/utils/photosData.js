const allImages = import.meta.glob('../data/img/*.jpg', { eager: true })

// Captions keyed by filename stem (matches photos.csv fid column)
const captions = {
  '1':    'The Ostenjak site with Loci I (left) and II (right) (Source: Djurić et al. 2012, Fig. 8, photo by Bojan Djurić).',
  '1_1':  'One of the loci in Gallery I with preserved blocks, traces and unfinished sarcophagi (Source: Djurić et al. 2012, Fig. 10, photo by Gašper Rutar).',
  '3':    'An outcrop of marble on Mt Medvednica (Source: Migotti et al. 2018, 208, Fig. 9, photo by M. Jambrović).',
  '3_1':  'The quarry in Podused, likely exploited for Andautonia and nearby settlements (Photo by Ines Ferjan, September 2024).',
  '4':    'The quarry at Hrastovica (Source: Migotti et al. 2018, 203, Fig. 2, photo by Lj. Perinić).',
  '4_1':  'The quarry at Hrastovica, a detail (Source: Migotti et al. 2018, 203, Fig. 3, photo by Lj. Perinić).',
  '4_2':  'A discarded product, possibly a sarcophagus chest (Source: Migotti et al. 2018, 204, photo by Lj. Perinić).',
  '5':    'The Žuta stijena site in Topusko (Source: Migotti et al. 2018, 205, photo by Bojan Djurić).',
  '16':   'An outcrop on Mt Dilj (Source: Migotti et al. 2018, 210, photo by Branka Migotti).',
  '26':   'Wedge holes in the quarry and on a block from the fortification core (Source: Djurić et al. 2018b, Fig. 8, photo by Bojan Djurić).',
  '45':   'Visible transition from the dolomite Sivec marble (grey) to the calcite Pletvar marble (yellow) (Source: Prochaska 2013, Fig. 3).',
  '46':   'Visible pick traces on the calcite marble from the Pletvar quarry (Source: Prochaska 2013, Fig. 11).',
  '49':   'The Šmartno/Frajham quarry complex in relation to road network, Poetovio and the workshop at Velenik (Source: Djurić et al. 2025, Fig. 2, graphics by Edisa Lozić).',
  '49_1': 'Marble block in the Kresnik quarry (Source: Djurić et al. 2025, Fig. 5, photo by Bojan Djurić).',
  '53':   'Fig. a Aerial photo from the region of Berkovitsa and Montana (Source: Andreeva et al. 2024, fig. 5 a, photo by Frerix B., ÖAI/ÖAW) and fig. b a quarry façade from Berkovitsa (Source: Andreeva et al. 2024, fig. 5 b, photo by Ivanov Il.).',
  '56':   'Traces of marble exploitation in Govrlevo quarry (not confirmed as ancient) (Source: Basotova 2019, Fig. 4, photo by Maja Basotova).',
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
