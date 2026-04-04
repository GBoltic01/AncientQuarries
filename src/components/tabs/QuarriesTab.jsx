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

export default function QuarriesTab({ features, selectedFeature, onFeatureSelect }) {
  const selectedFid = selectedFeature?.properties?.fid
  const itemRefs = useRef({})

  // Scroll to the open accordion item when selection changes
  useEffect(() => {
    if (selectedFid == null) return
    const el = itemRefs.current[selectedFid]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [selectedFid])

  function handleChange(feature) {
    const isOpen = selectedFid === feature.properties.fid
    onFeatureSelect(isOpen ? null : feature)
  }

  return (
    <Box sx={{ px: 1.5 }}>
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
            square
            sx={{
              '&:before': { display: 'none' },
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: isExpanded ? 700 : 400 }}>
                  {p.NAME}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {p.PROVINCE}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ pt: 0, px: 2 }}>
              <Divider sx={{ mb: 2 }} />
              {p.STATUS && (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={p.STATUS}
                    size="small"
                    color={p.STATUS === 'Confirmed' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </Box>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Field label="Location" value={p.LOCATION} />
                <Field label="Material" value={p.MATERIAL} />
                <Field label="Products" value={p.PRODUCTS} />
                <Field label="Supply to" value={p.SUPPLY} />
                <Field label="Archaeological Evidence" value={p.ARCHAEOLOGICAL_EVIDENCE} />
                <Field label="Potential Transport" value={p.POTENTIAL_TRANSPORT} />
                <Field label="Bibliography" value={p.BIBLIOGRAPHY} />
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      })}
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
