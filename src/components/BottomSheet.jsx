import { useState, useEffect, useRef } from 'react'
import { SwipeableDrawer, Box, Typography, Chip, Divider } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const DRAWER_BLEEDING = 48 // px visible when drawer is closed (the "hook")

export default function BottomSheet({ features, selectedFeature, onFeatureSelect }) {
  const [open, setOpen] = useState(false)
  const swiperRef = useRef(null)
  const isProgrammatic = useRef(false)

  // When a pin is clicked on the map, open the drawer and navigate to that card
  useEffect(() => {
    if (!selectedFeature) return
    const idx = features.findIndex((f) => f.properties.fid === selectedFeature.properties.fid)
    if (idx === -1) return

    setOpen(true)

    if (swiperRef.current && swiperRef.current.activeIndex !== idx) {
      isProgrammatic.current = true
      swiperRef.current.slideTo(idx)
    }
  }, [selectedFeature, features])

  function handleSlideChange(swiper) {
    // Ignore slides triggered programmatically to avoid feedback loops
    if (isProgrammatic.current) {
      isProgrammatic.current = false
      return
    }
    const feature = features[swiper.activeIndex]
    if (feature) onFeatureSelect(feature)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      swipeAreaWidth={DRAWER_BLEEDING}
      disableSwipeToOpen={false}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          height: `calc(33vh + ${DRAWER_BLEEDING}px)`,
          overflow: 'visible',
          borderRadius: '16px 16px 0 0',
        },
      }}
    >
      {/* Puller — visible above the drawer edge even when closed */}
      <Box
        sx={{
          position: 'absolute',
          top: -DRAWER_BLEEDING,
          left: 0,
          right: 0,
          height: DRAWER_BLEEDING,
          bgcolor: 'background.paper',
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        {/* Drag handle bar */}
        <Box sx={{ width: 32, height: 4, bgcolor: 'grey.400', borderRadius: 2 }} />
        <Typography variant="caption" color="text.secondary">
          {open ? 'Swipe down to close' : 'Swipe up for quarries'}
        </Typography>
      </Box>

      {/* Cards */}
      <Box sx={{ height: '100%', pt: 1, overflow: 'hidden' }}>
        <Swiper
          slidesPerView={1.15}
          spaceBetween={12}
          centeredSlides
          style={{ height: '100%', paddingLeft: 8, paddingRight: 8 }}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          onSlideChange={handleSlideChange}
        >
          {features.map((feature) => (
            <SwiperSlide key={feature.properties.fid} style={{ height: '100%' }}>
              <QuarryCard feature={feature} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </SwipeableDrawer>
  )
}

function QuarryCard({ feature }) {
  const p = feature.properties

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        overflowY: 'auto',
        boxShadow: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, flex: 1 }}>
          {p.NAME}
        </Typography>
        {p.STATUS && (
          <Chip
            label={p.STATUS}
            size="small"
            color={p.STATUS === 'Confirmed' ? 'success' : 'default'}
            variant="outlined"
            sx={{ ml: 1, flexShrink: 0 }}
          />
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        {p.PROVINCE}
      </Typography>

      <Divider sx={{ mb: 1.5 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <CardField label="Material" value={p.MATERIAL} />
        <CardField label="Products" value={p.PRODUCTS} />
        <CardField label="Supply to" value={p.SUPPLY} />
        <CardField label="Transport" value={p.POTENTIAL_TRANSPORT} />
        <CardField label="Location" value={p.LOCATION} />
      </Box>
    </Box>
  )
}

function CardField({ label, value }) {
  if (!value || value === '/') return null
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.25 }}>
        {value}
      </Typography>
    </Box>
  )
}
