import { Box, Typography, List, ListItem } from '@mui/material'

export default function BibliographyTab({ features }) {
  // Collect unique, non-empty bibliography strings and sort alphabetically
  const entries = Array.from(
    new Set(
      features
        .map((f) => f.properties.BIBLIOGRAPHY)
        .filter((b) => b && b !== '/')
        .map((b) => b.trim())
    )
  ).sort()

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h6" gutterBottom>Bibliography</Typography>
      <List disablePadding>
        {entries.map((entry, i) => (
          <ListItem
            key={i}
            disableGutters
            alignItems="flex-start"
            sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Typography variant="body2" color="text.secondary">
              {entry}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
