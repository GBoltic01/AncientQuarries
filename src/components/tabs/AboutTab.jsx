import { Box, Typography, Divider, Link } from '@mui/material'

export default function AboutTab() {
  return (
    <Box sx={{ px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      <Box>
        <Typography variant="h6" gutterBottom>About the Project</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This project focuses on local stone resources in the inland Balkans. The study was primarily desk-based, relying on existing archaeological publications to establish the extent and nature of stone exploitation in the region. While several quarry sites were visited, the aim of the project was not to seek unidentified Roman quarries, acknowledging that more likely exist beyond those presented on this map, but rather to provide as comprehensive regional overview of extraction activity as possible.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          As the area also relied on certain stone sources from neighbouring regions, a selection of those most frequently imported has been included.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Note: As the exact locations of some Roman quarries or potential stone source areas are now known, the mapped points represent approximate positions. In such cases, the location nearest to the modern settlement associated with the quarry or potential stone source area has been used. In other instances, quarries or potential source areas are represented within an approximate 5 km² radius around a central point (such as a district, mountain, or ridge) or aligned with the geographical name identified in OpenStreetMap.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Future Directions</Typography>
        <Typography variant="body2" color="text.secondary">
          This project represents the current state of research and available data at the time of development. We recognise that the number of Roman quarries and/or potential source areas in the inland Balkans was likely higher, and these could be incorporated to further improve the map. We welcome new information and would be happy to include new data if it is shared with us in the appropriate shapefile format.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Authors and Contact</Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Ines Ferjan</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>Roman Archaeologist</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          During the course of my doctoral research, <em>The Roman Stone Trade in the Inland Balkans: Quarrying, Transport and Carving</em>, I examined both locally available and imported stone in order to analyse distribution patterns. This analysis allowed for the assessment of stone resources, and further examination of potential transport routes, and carving practices, while also addressing questions related to workshop production, dynamics between clients and producers, and decision-making processes involved in commissioning stone products.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This project <em>Roman Quarries of the Balkans</em> forms a part of this wider research, which was conducted as part of doctoral degree at the University of Edinburgh, under supervision of Drs Ben Russell and Manuel Fernández-Götz.
        </Typography>
        <Typography variant="body2">
          Contact: <Link href="mailto:ines.ferjan@ed.ac.uk">ines.ferjan@ed.ac.uk</Link>
        </Typography>
      </Box>

    </Box>
  )
}
