import { Box, Typography } from '@mui/material'

export default function AboutTab() {
  return (
    <Box sx={{ px: 3, py: 3 }}>
      <Typography variant="h6" gutterBottom>About This Project</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      </Typography>
    </Box>
  )
}
