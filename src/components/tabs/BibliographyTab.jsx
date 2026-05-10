import { Box, Typography, List, ListItem } from '@mui/material'
import bibliographyData from '../../data/bibliography.json'

export default function BibliographyTab() {
  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h6" gutterBottom>Bibliography</Typography>
      <List disablePadding>
        {bibliographyData.map((entry, i) => (
          <ListItem
            key={i}
            disableGutters
            alignItems="flex-start"
            sx={{ py: 0.75, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Typography variant="body2" color="text.secondary" component="p">
              {entry.before}{' '}<em>{entry.italic}</em>{' '}{entry.after}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
