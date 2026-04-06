import { useState, useRef } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MapView from './components/MapView'
import SidePanel from './components/SidePanel'
import quarriesData from './data/Quarries_260406.geojson'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(25, 112, 29)',
    },
    secondary: {
      main: '#D97706',
    },
  },
})
const features = quarriesData.features

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [panelExpanded, setPanelExpanded] = useState(false)
  const mapRef = useRef(null)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  function handleFeatureSelect(feature) {
    setSelectedFeature(feature)
    if (mapRef.current && feature) {
      const [lng, lat] = feature.geometry.coordinates
      mapRef.current.flyTo([lat, lng], 12)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>

        {/* Header */}
        <AppBar position="static" elevation={2}>
          <Toolbar variant="dense">
            <Typography variant="h6" component="h1" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              Roman Quarries of the Balkans
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main content — always 50/50, stacked vertically on mobile, side by side on desktop */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', overflow: 'hidden' }}>

          {/* Map — 50% on desktop/mobile-collapsed, 0 when panel is expanded on mobile */}
          <Box sx={{
            flex: isMobile ? 'none' : 1,
            height: isMobile ? (panelExpanded ? 0 : '50%') : undefined,
            minHeight: 0,
            minWidth: 0,
            overflow: 'hidden',
            transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <MapView
              features={features}
              onFeatureSelect={handleFeatureSelect}
              onMapReady={(map) => { mapRef.current = map }}
            />
          </Box>

          {/* Side panel — fills remaining space */}
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
              panelExpanded={panelExpanded}
              onPanelExpand={setPanelExpanded}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
