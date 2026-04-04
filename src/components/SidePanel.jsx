import { useEffect, useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import AboutTab from './tabs/AboutTab'
import QuarriesTab from './tabs/QuarriesTab'
import BibliographyTab from './tabs/BibliographyTab'

export default function SidePanel({ features, selectedFeature, onFeatureSelect }) {
  const [activeTab, setActiveTab] = useState(1) // default to Quarries

  // When a pin is clicked, switch to the Quarries tab automatically
  useEffect(() => {
    if (selectedFeature) setActiveTab(1)
  }, [selectedFeature])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Fixed tab ribbon */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', flexShrink: 0 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="fullWidth">
          <Tab label="About" />
          <Tab label="Quarries" />
          <Tab label="Bibliography" />
        </Tabs>
      </Box>

      {/* Scrollable content area */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
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
