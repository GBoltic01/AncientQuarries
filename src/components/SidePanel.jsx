import { useEffect, useRef, useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import AboutTab from './tabs/AboutTab'
import QuarriesTab from './tabs/QuarriesTab'
import BibliographyTab from './tabs/BibliographyTab'

export default function SidePanel({ features, selectedFeature, onFeatureSelect, isMobile, panelExpanded, onPanelExpand }) {
  const [activeTab, setActiveTab] = useState(0) // default to About
  const scrollRef = useRef(null)
  const pointerStartY = useRef(null)

  // When a pin is clicked, switch to the Quarries tab automatically
  useEffect(() => {
    if (selectedFeature) setActiveTab(1)
  }, [selectedFeature])

  function handleTabChange(_, v) {
    setActiveTab(v)
    if (v !== 1 && scrollRef.current) scrollRef.current.scrollTop = 0
  }

  function handlePointerDown(e) {
    pointerStartY.current = e.clientY
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerUp(e) {
    if (pointerStartY.current === null) return
    const deltaY = e.clientY - pointerStartY.current
    pointerStartY.current = null
    if (deltaY < -50) onPanelExpand(true)
    else if (deltaY > 50) onPanelExpand(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Drag handle — mobile only */}
      {isMobile && (
        <Box
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 0.75,
            flexShrink: 0,
            cursor: 'grab',
            bgcolor: 'background.paper',
            borderBottom: panelExpanded ? 0 : 0,
            touchAction: 'none',
          }}
        >
          <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: 'action.disabled' }} />
        </Box>
      )}

      {/* Fixed tab ribbon */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" textColor="secondary" indicatorColor="secondary">
          <Tab label="About" />
          <Tab label="Quarries" />
          <Tab label="Bibliography" />
        </Tabs>
      </Box>

      {/* Scrollable content area */}
      <Box ref={scrollRef} sx={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 0 && <AboutTab />}
        {activeTab === 1 && (
          <QuarriesTab
            features={features}
            selectedFeature={selectedFeature}
            onFeatureSelect={onFeatureSelect}
          />
        )}
        {activeTab === 2 && <BibliographyTab features={features} />}
      </Box>
    </Box>
  )
}
