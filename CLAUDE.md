# CLAUDE.md — Project Instructions

## Project Overview

A single-page interactive map showing Roman quarries in the Balkans region.
Users click pins on the map to see detailed quarry information.
No backend — all data is static GeoJSON.

## Tech Stack

- **Framework:** React 18 + Vite
- **Mapping:** react-leaflet v4 + Leaflet v1 + Thunderforest Landscape tiles
- **Clustering:** react-leaflet-cluster v2
- **UI components:** MUI (Material UI) v5
- **No Tailwind** — MUI handles all styling via `sx` prop
- **API key:** `VITE_THUNDERFOREST_API_KEY` in `.env` (see `.env.example`)

## Layout

- Full-height `AppBar` header at top
- Below header: **Map (50%)** | **Side Panel (50%)**
- Desktop: side by side (flex row)
- Mobile: stacked vertically (flex column), map on top

## Side Panel

Fixed tab ribbon at the top with three tabs:
- **About** — project description (lorem ipsum placeholder)
- **Quarries** — MUI accordion list of all quarries (default tab)
- **Bibliography** — deduplicated, sorted list of bibliography entries from GeoJSON

Accordion behaviour:
- All quarry names visible when collapsed
- Clicking a name expands it; clicking again collapses it
- Clicking a map pin switches to Quarries tab, expands that entry, and scrolls to it
- Accordion content has `px: 1.5` horizontal margin for breathing room

## Map Behavior

- Default center: `[44.0, 18.5]` (Balkans region)
- Default zoom: `7`
- Basemap: OpenStreetMap
- On feature select: `map.flyTo([lat, lng], 12)`

## GeoJSON Data (`src/data/quarries.geojson`)

Each feature is a Point. Coordinates are `[lng, lat]` (GeoJSON standard).
Leaflet's `flyTo` takes `[lat, lng]` — always flip when using coordinates.

| Field | Description |
|---|---|
| NAME | Quarry name |
| PROVINCE | Roman province |
| STATUS | e.g. Confirmed, Probable |
| LOCATION | Human-readable location |
| MATERIAL | Stone type |
| PRODUCTS | What was produced |
| SUPPLY | City/region supplied |
| ARCHAEOLOGICAL_EVIDENCE | Evidence at site |
| POTENTIAL_TRANSPORT | Rivers/routes used |
| BIBLIOGRAPHY | References |

## State Architecture

All state lives in `App.jsx`:
- `selectedFeature` — the currently selected GeoJSON feature (or `null`)
- `mapRef` — ref to the Leaflet map instance (set via `onMapReady` callback from `MapView`)
- `handleFeatureSelect(feature)` — updates state and calls `map.flyTo()`

## File Structure

```
src/
  components/
    MapView.jsx             ← map + clustered markers + pin click + MapController
    SidePanel.jsx           ← tab ribbon, routes to tab components
    tabs/
      AboutTab.jsx          ← lorem ipsum placeholder
      QuarriesTab.jsx       ← accordion list with scroll-to behaviour
      BibliographyTab.jsx   ← deduplicated bibliography list
  data/
    quarries.geojson
  App.jsx                   ← layout, state, responsive split (useMediaQuery)
  main.jsx                  ← React entry point
  index.css                 ← leaflet container fix + html/body reset
index.html
vite.config.js              ← includes inline .geojson → JSON transform plugin
.env                        ← VITE_THUNDERFOREST_API_KEY (git-ignored)
.env.example                ← template for the above
package.json
```

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

## Known Gotchas

- **GeoJSON import:** Vite doesn't natively handle `.geojson` extensions as JSON modules. A custom inline plugin in `vite.config.js` handles this.
- **Leaflet marker icons:** Vite breaks Leaflet's default marker icons. Fixed in `MapView.jsx` by manually merging icon options with imported asset URLs.
- **Coordinate order:** GeoJSON uses `[lng, lat]`; Leaflet uses `[lat, lng]`. Always destructure as `const [lng, lat] = feature.geometry.coordinates` before passing to Leaflet.
- **Swiper loop prevention:** `BottomSheet.jsx` uses an `isProgrammatic` ref flag to prevent feedback loops between `slideTo()` calls and `onSlideChange` events.
