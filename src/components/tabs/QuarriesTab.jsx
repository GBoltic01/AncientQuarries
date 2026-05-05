import { useEffect, useRef } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { getPhotosForFid } from '../../utils/photosData'

export default function QuarriesTab({ features, selectedFeature, onFeatureSelect }) {
  const selectedFid = selectedFeature?.properties?.fid
  const itemRefs = useRef({})

  // Scroll to the open accordion item when selection changes
  useEffect(() => {
    if (selectedFid == null) return
    const el = itemRefs.current[selectedFid]
    if (!el) return
    // Delay scroll until the previously open accordion finishes collapsing (~300ms)
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 600)
    return () => clearTimeout(timer)
  }, [selectedFid])

  function handleChange(feature) {
    const isOpen = selectedFid === feature.properties.fid
    onFeatureSelect(isOpen ? null : feature)
  }

  return (
    <Box sx={{ px: 2.5, py: 1 }}>
      {features.map((feature) => {
        const p = feature.properties
        const isExpanded = selectedFid === p.fid

        return (
          <Accordion
            key={p.fid}
            ref={(el) => { itemRefs.current[p.fid] = el }}
            expanded={isExpanded}
            onChange={() => handleChange(feature)}
            disableGutters
            sx={{
              '&:before': { display: 'none' },
              mb: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '8px !important',
              overflow: 'hidden',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 1 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: isExpanded ? 700 : 400 }}>
                    {p.NAME}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {p.PROVINCE}
                  </Typography>
                </Box>
                {p.STATUS && (
                  <Chip
                    label={p.STATUS}
                    size="small"
                    variant="outlined"
                    sx={
                      p.STATUS === 'Confirmed'
                        ? { borderColor: 'success.main', color: 'success.main' }
                        : { borderColor: '#db5d0f', color: '#db5d0f' }
                    }
                  />
                )}
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ pt: 0, px: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Field label="Location" value={p.LOCATION} />
                <Field label="Material" value={p.MATERIAL} />
                <Field label="Products" value={p.PRODUCTS} />
                <Field label="Supply to" value={p.SUPPLY} />
                <Field label="Quarry Sites" value={p.QUARRY_SITES} />
                <Field label="Archaeological Evidence" value={p.ARCHAEOLOGICAL_EVIDENCE} />
                <Field label="Extraction Traces" value={p.EXTRACTION_TRACES} />
                <Field label="Unfinished Products" value={p.UNFINISHED_PRODUCTS} />
                <Field label="Tools" value={p.TOOLS} />
                <Field label="Measurements" value={p.MEASUREMENTS} />
                <Field label="Comments" value={p.COMMENTS} />
                <Field label="Bibliography" value={p.BIBLIOGRAPHY} />
              </Box>
              <PhotoGallery fid={p.fid} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}

function PhotoGallery({ fid }) {
  const photos = getPhotosForFid(fid)
  if (photos.length === 0) return null
  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Divider />
      {photos.map((photo, i) => (
        <Box key={i}>
          <Box
            component="img"
            src={photo.src}
            alt={photo.caption}
            sx={{ width: '100%', borderRadius: 1, display: 'block' }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {photo.caption}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

function Field({ label, value }) {
  if (!value || value === '/') return null
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.25 }}>
        {value}
      </Typography>
    </Box>
  )
}
