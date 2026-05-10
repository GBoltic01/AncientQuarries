import { useState, useRef, useCallback } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MapView from './components/MapView'
import SidePanel from './components/SidePanel'
import quarriesData from './data/Quarries_260406.geojson'

const theme = createTheme({
  palette: {
    primary: { main: 'rgb(25, 112, 29)' },
    secondary: { main: '#D97706' },
  },
})
const features = quarriesData.features
const SNAP_TRANSITION = 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
// drag handle (~16px) + MUI Tabs (~48px) + border (1px)
const PANEL_HEADER_H = 65

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState(null)
  // 'default' = 50/50 | 'expanded' = full panel | 'minimized' = tabs only
  const [panelState, setPanelState] = useState('default')
  const panelStateRef = useRef('default')
  panelStateRef.current = panelState  // stay in sync without closure staleness

  const mapRef = useRef(null)
  const mapBoxRef = useRef(null)
  const dragBaseH = useRef(null)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Animate map back to 50/50 and update state — called when panel is minimized
  // and something needs the panel visible (e.g. a pin click).
  function snapPanelToDefault() {
    if (panelStateRef.current !== 'minimized') return
    const el = mapBoxRef.current
    if (el && el.parentElement) {
      el.style.transition = SNAP_TRANSITION
      el.style.height = `${el.parentElement.clientHeight * 0.5}px`
      function cleanup() {
        el.style.height = ''
        el.style.transition = ''
        el.removeEventListener('transitionend', cleanup)
        mapRef.current?.invalidateSize()
      }
      el.addEventListener('transitionend', cleanup)
    }
    panelStateRef.current = 'default'
    setPanelState('default')
  }

  function handleFeatureSelect(feature) {
    setSelectedFeature(feature)
    snapPanelToDefault()
    if (mapRef.current && feature) {
      const [lng, lat] = feature.geometry.coordinates
      mapRef.current.flyTo([lat, lng], 12)
    }
  }

  const handleDragStart = useCallback(() => {
    const el = mapBoxRef.current
    if (!el) return
    el.style.transition = 'none'
    dragBaseH.current = el.offsetHeight
  }, [])

  const handleDragMove = useCallback((deltaY) => {
    const el = mapBoxRef.current
    if (!el || dragBaseH.current === null) return
    const containerH = el.parentElement.clientHeight
    const defaultH = containerH * 0.5
    const minimizedH = containerH - PANEL_HEADER_H

    // Clamp drag range to adjacent states only
    let minH, maxH
    if (panelStateRef.current === 'expanded')       { minH = 0;        maxH = defaultH   }
    else if (panelStateRef.current === 'minimized') { minH = defaultH; maxH = minimizedH }
    else                                            { minH = 0;        maxH = minimizedH }

    el.style.height = `${Math.max(minH, Math.min(maxH, dragBaseH.current + deltaY))}px`
    mapRef.current?.invalidateSize({ animate: false })
  }, [])

  const handleDragEnd = useCallback((deltaY) => {
    const el = mapBoxRef.current
    if (!el) return
    const containerH = el.parentElement.clientHeight
    const defaultH = containerH * 0.5
    const minimizedH = containerH - PANEL_HEADER_H
    const baseH = dragBaseH.current
    dragBaseH.current = null

    const current = panelStateRef.current
    let targetH, newState = null

    if (current === 'default') {
      if (deltaY < -50)     { targetH = 0;          newState = 'expanded'  }
      else if (deltaY > 50) { targetH = minimizedH; newState = 'minimized' }
      else                    targetH = baseH ?? defaultH
    } else if (current === 'expanded') {
      if (deltaY > 50)      { targetH = defaultH;   newState = 'default'   }
      else                    targetH = baseH ?? 0
    } else {  // minimized
      if (deltaY < -50)     { targetH = defaultH;   newState = 'default'   }
      else                    targetH = baseH ?? minimizedH
    }

    el.style.transition = SNAP_TRANSITION
    el.style.height = `${targetH}px`

    // Update state early so React re-renders during the transition;
    // by the time transitionend fires the sx class is already correct.
    if (newState) {
      panelStateRef.current = newState
      setPanelState(newState)
    }

    function cleanup() {
      el.style.height = ''
      el.style.transition = ''
      el.removeEventListener('transitionend', cleanup)
      mapRef.current?.invalidateSize()
    }
    el.addEventListener('transitionend', cleanup)
  }, [])

  const mapHeight = !isMobile ? undefined
    : panelState === 'expanded'  ? 0
    : panelState === 'minimized' ? `calc(100% - ${PANEL_HEADER_H}px)`
    : '50%'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

        <AppBar position="static" elevation={2}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="h1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              Roman Quarries of the Balkans
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>

          <Box ref={mapBoxRef} sx={{
            flex: isMobile ? 'none' : 1,
            height: mapHeight,
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
            transition: SNAP_TRANSITION,
          }}>
            <MapView
              features={features}
              onFeatureSelect={handleFeatureSelect}
              onMapReady={(map) => { mapRef.current = map }}
            />
          </Box>

          <Box sx={{
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            borderLeft: isMobile ? 'none' : '1px solid',
            borderTop: isMobile ? '1px solid' : 'none',
            borderColor: 'divider',
            overflow: 'hidden',
          }}>
            <SidePanel
              features={features}
              selectedFeature={selectedFeature}
              onFeatureSelect={handleFeatureSelect}
              isMobile={isMobile}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
