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
- **Theme colours:** primary `rgb(25,112,29)` (green), secondary `#D97706` (amber)
- **API key:** `VITE_THUNDERFOREST_API_KEY` in `.env` (see `.env.example`)

## Layout

- Full-height `AppBar` header at top
- Below header: **Map** | **Side Panel** (flex column on mobile, flex row on desktop)
- Desktop: always 50/50 side by side
- Mobile: three-state resizable panel (see Mobile Panel below)

## Mobile Panel

The side panel is draggable on mobile via a pill-shaped handle at the top. Three states:

| State | Map height | Panel shows |
|---|---|---|
| `default` | 50% | Full panel |
| `expanded` | 0 | Full panel (map hidden) |
| `minimized` | `calc(100% - 65px)` | Tab bar only |

Swipe gestures from each state:
- `default` + swipe up → `expanded`
- `default` + swipe down → `minimized`
- `expanded` + swipe down → `default`
- `minimized` + swipe up → `default`

Panel state (`'default' | 'expanded' | 'minimized'`) lives in `App.jsx`. All height animation is done via **direct DOM manipulation** on `mapBoxRef` (not React state) to avoid re-render jank during drag. `map.invalidateSize()` is called after each transition so Leaflet refills the new viewport.

Clicking a map pin while the panel is minimised automatically snaps it back to `default`.

### Drag gesture implementation
The drag handle uses **native DOM event listeners** (not React synthetic events) attached in a `useEffect`. Two event paths run in parallel, guarded by a `usingTouch` flag:
- `touchstart` / `touchmove` / `touchend` with `{ passive: false }` — real mobile devices
- `pointerdown` / `pointermove` / `pointerup` — Chromium DevTools mobile emulation

The handle also carries an empty `onClick={() => {}}` React prop. Without it, Chromium's DevTools device emulator does not dispatch pointer events to the element.

## Side Panel

Fixed tab ribbon at the top with three tabs:
- **About** — project description
- **Quarries** — MUI accordion list of all quarries, sorted A–Z by name (default tab)
- **Bibliography** — sorted list of bibliography entries from `bibliography.json`

Accordion behaviour:
- All quarry names visible when collapsed
- Clicking a name expands it; clicking again collapses it
- Clicking a map pin switches to Quarries tab, expands that entry, and scrolls to it
- Accordion scroll uses a 600ms delay to wait for the collapse animation before scrolling

## Map Behavior

- Default center: `[44.0, 18.5]` (Balkans region)
- Default zoom: `7`
- Basemap switcher (bottom-left): Thunderforest Landscape (default) + ESRI World Imagery satellite
- On feature select: `map.flyTo([lat, lng], 12)`

## GeoJSON Data (`src/data/Quarries_260406.geojson`)

Each feature is a Point. Coordinates are `[lng, lat]` (GeoJSON standard).
Leaflet's `flyTo` takes `[lat, lng]` — always flip when using coordinates.

| Field | Description |
|---|---|
| fid | Unique feature ID (used as React key and scroll target) |
| NAME | Quarry name |
| PROVINCE | Roman province |
| STATUS | `Confirmed` (green pin) or `Potential Source Area` (amber pin) |
| LOCATION | Human-readable location |
| MATERIAL | Stone type |
| PRODUCTS | What was produced |
| SUPPLY | City/region supplied |
| QUARRY_SITES | Known quarry sites |
| ARCHAEOLOGICAL_EVIDENCE | Evidence at site |
| EXTRACTION_TRACES | Visible extraction traces |
| UNFINISHED_PRODUCTS | Unfinished products found |
| TOOLS | Tools found |
| MEASUREMENTS | Quarry measurements |
| COMMENTS | Additional notes |
| BIBLIOGRAPHY | References |

## Bibliography Data

- **Source of truth:** `src/data/bibliography.csv` — three columns: `AuthorsTitle`, `JournalProceedings`, `PlacePages`
- **Used by app:** `src/data/bibliography.json` — parsed from the CSV, sorted A–Z by author surname (Č, Š sort after Z)
- Each JSON entry: `{ before, italic, after }` rendered as `{before} <em>{italic}</em> {after}`
- When the CSV changes, manually regenerate `bibliography.json` to match (column 1 → `before`, column 2 → `italic`, column 3 → `after`)

## State Architecture

All state lives in `App.jsx`:
- `selectedFeature` — currently selected GeoJSON feature (or `null`)
- `panelState` — `'default' | 'expanded' | 'minimized'` (mobile panel state)
- `panelStateRef` — ref kept in sync with `panelState` for use in stable `useCallback` handlers
- `mapRef` — ref to the Leaflet map instance (set via `onMapReady` from `MapView`)
- `mapBoxRef` — ref to the map container DOM element (for direct height manipulation during drag)
- `dragBaseH` — ref storing map height at drag start (px)
- `handleFeatureSelect(feature)` — updates state, snaps panel to default if minimised, calls `map.flyTo()`
- `handleDragStart / handleDragMove / handleDragEnd` — stable `useCallback` handlers passed to `SidePanel`; manipulate `mapBoxRef` directly and call `setPanelState` only on release

## File Structure

```
src/
  components/
    MapView.jsx             ← map + clustered markers + pin click + MapController
    SidePanel.jsx           ← tab ribbon + mobile drag handle + routes to tab components
    tabs/
      AboutTab.jsx          ← project description
      QuarriesTab.jsx       ← accordion list (A–Z) with scroll-to behaviour + photo gallery
      BibliographyTab.jsx   ← bibliography list from bibliography.json
  utils/
    quarryIcon.js           ← custom pin divIcon factory, colored by STATUS
    photosData.js           ← maps quarry fid → photo src + caption arrays
    pickaxe.svg             ← icon shown inside each pin
    markers-shadow.png      ← shadow image rendered below each pin
  data/
    Quarries_260406.geojson ← main data file
    bibliography.csv        ← source of truth for bibliography
    bibliography.json       ← parsed from CSV, used by BibliographyTab
  App.jsx                   ← layout, state, mobile panel logic (useMediaQuery)
  main.jsx                  ← React entry point
  index.css                 ← leaflet container fix + html/body/root reset + overscroll-behavior:none
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
- **Custom pin markers:** Defined in `src/utils/quarryIcon.js`. Teardrop shape via `border-radius: 50% 50% 50% 0; transform: rotate(-45deg)`. Icon sits in a counter-rotated wrapper div to stay upright. Shadow from `src/utils/markers-shadow.png`.
- **Coordinate order:** GeoJSON uses `[lng, lat]`; Leaflet uses `[lat, lng]`. Always destructure as `const [lng, lat] = feature.geometry.coordinates` before passing to Leaflet.
- **Accordion scroll timing:** 600ms `setTimeout` delay in `QuarriesTab.jsx` — MUI collapse animation shifts sibling positions, so scroll must wait for it to finish.
- **Mobile drag — React events arrive too late:** Chrome's touch gesture recogniser fires before React's delegated handlers can call `e.preventDefault()`. Fix: attach native listeners directly to the handle DOM element with `{ passive: false }`.
- **Mobile drag — Chromium DevTools emulation:** The emulator only dispatches pointer events (not touch events) and only to elements with a React event handler. The empty `onClick={() => {}}` on the drag handle is load-bearing — do not remove it.
- **Leaflet resize:** Leaflet does not observe container size changes automatically. Call `map.invalidateSize()` after any layout transition that resizes the map container.
- **Panel header height constant:** `PANEL_HEADER_H = 65` in `App.jsx` (drag handle ~16px + MUI Tabs ~48px + border 1px). If the minimised panel looks clipped, adjust this constant.
