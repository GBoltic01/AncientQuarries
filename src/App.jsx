import { useState, useRef } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MapView from './components/MapView'
import SidePanel from './components/SidePanel'
import quarriesData from './data/quarries.geojson'

const theme = createTheme()
const features = quarriesData.features

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState(null)
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

          {/* Map — 50% */}
          <Box sx={{ flex: 1, minHeight: 0, minWidth: 0 }}>
            <MapView
              onFeatureSelect={handleFeatureSelect}
              onMapReady={(map) => { mapRef.current = map }}
            />
          </Box>

          {/* Side panel — 50% */}
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
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
