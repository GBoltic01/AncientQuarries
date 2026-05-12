import { useEffect, useRef, useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import AboutTab from './tabs/AboutTab'
import QuarriesTab from './tabs/QuarriesTab'
import BibliographyTab from './tabs/BibliographyTab'

export default function SidePanel({ features, selectedFeature, onFeatureSelect, isMobile, onDragStart, onDragMove, onDragEnd }) {
  const [activeTab, setActiveTab] = useState(0)
  const scrollRef = useRef(null)
  const dragHandleRef = useRef(null)

  useEffect(() => {
    if (selectedFeature) setActiveTab(1)
  }, [selectedFeature])

  function handleTabChange(_, v) {
    setActiveTab(v)
    if (v !== 1 && scrollRef.current) scrollRef.current.scrollTop = 0
  }

  useEffect(() => {
    const handle = dragHandleRef.current
    if (!handle) return

    let startY = null
    let usingTouch = false  // prevents double-processing when both event types fire

    // Touch events (real mobile devices)
    function onTouchStart(e) {
      usingTouch = true
      startY = e.touches[0].clientY
      onDragStart?.()
      e.preventDefault()
    }
    function onTouchMove(e) {
      if (!usingTouch || startY === null) return
      onDragMove?.(e.touches[0].clientY - startY)
    }
    function onTouchEnd(e) {
      if (!usingTouch || startY === null) return
      const deltaY = e.changedTouches[0].clientY - startY
      startY = null
      usingTouch = false
      onDragEnd?.(deltaY)
    }

    // Pointer events (DevTools emulation fallback)
    function onPointerDown(e) {
      if (usingTouch || startY !== null) return
      startY = e.clientY
      onDragStart?.()
      handle.setPointerCapture(e.pointerId)
    }
    function onPointerMove(e) {
      if (usingTouch || startY === null) return
      onDragMove?.(e.clientY - startY)
    }
    function onPointerUp(e) {
      if (usingTouch || startY === null) return
      const deltaY = e.clientY - startY
      startY = null
      onDragEnd?.(deltaY)
    }
    function onPointerCancel() {
      if (usingTouch) return
      startY = null
      onDragEnd?.(0)
    }

    handle.addEventListener('touchstart', onTouchStart, { passive: false })
    handle.addEventListener('touchmove', onTouchMove, { passive: false })
    handle.addEventListener('touchend', onTouchEnd)
    handle.addEventListener('pointerdown', onPointerDown)
    handle.addEventListener('pointermove', onPointerMove)
    handle.addEventListener('pointerup', onPointerUp)
    handle.addEventListener('pointercancel', onPointerCancel)

    return () => {
      handle.removeEventListener('touchstart', onTouchStart)
      handle.removeEventListener('touchmove', onTouchMove)
      handle.removeEventListener('touchend', onTouchEnd)
      handle.removeEventListener('pointerdown', onPointerDown)
      handle.removeEventListener('pointermove', onPointerMove)
      handle.removeEventListener('pointerup', onPointerUp)
      handle.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [isMobile, onDragStart, onDragMove, onDragEnd])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Drag handle — mobile only */}
      {isMobile && (
        <Box
          ref={dragHandleRef}
          onClick={() => {}}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
            flexShrink: 0,
            cursor: 'grab',
            bgcolor: 'background.paper',
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
