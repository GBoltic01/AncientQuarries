import { Box, Typography, List, ListItem } from '@mui/material'
import bibliographyData from '../../data/bibliography.json'

export default function BibliographyTab() {
  const sorted = [...bibliographyData].sort((a, b) => {
    const textA = a[0]?.text ?? ''
    const textB = b[0]?.text ?? ''
    return textA.localeCompare(textB)
  })

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h6" gutterBottom>Bibliography</Typography>
      <List disablePadding>
        {sorted.map((segments, i) => (
          <ListItem
            key={i}
            disableGutters
            alignItems="flex-start"
            sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Typography variant="body2" color="text.secondary" component="p">
              {segments.map((seg, j) =>
                seg.italic ? <em key={j}>{seg.text}</em> : seg.text
              )}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
