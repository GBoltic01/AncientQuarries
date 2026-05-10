import { Box, Typography, Divider, Link } from '@mui/material'

export default function AboutTab() {
  return (
    <Box sx={{ px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      <Box>
        <Typography variant="h6" gutterBottom>
          Visualising Roman Quarrying Landscapes in the Inland Balkans
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          With the Roman arrival in the inland Balkans, stone became essential for construction and an integral material in various aspects of Roman culture. Its durability made it a preferred, long-lasting material across the Roman Empire, and the provinces of the inland Balkans were no exception. The region's complex geological landscape enabled the exploitation of multiple stone types with varying properties and uses. In recent years, archaeological scholarship has turned its attention to identifying quarrying zones and stone supply in the region to determine which quarries met the stone demand. This study examined local stone resources to understand what was available in the inland Balkans — specifically the parts of the Roman provinces of Pannonia, Moesia Superior, and Macedonia (modern inland Croatia, Serbia, Kosovo, and North Macedonia) — and through that availability clarifies the demand for imported stone.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The sourcing of stone depended on its quality and the purpose of its use. Certain areas had abundant surface resources with easily accessible stone that was often utilised as rubble or for construction purposes that did not require cut stone blocks. However, for the extraction of stone blocks, the primary consideration was the quality of the stone, with marble and limestone being the most suitable options. While the study includes both confirmed Roman quarries and potential source areas in the region, to assess the local availability of and demand for stone, the primary focus was on the material analysis of sarcophagi, stelae, statuary, and architectural elements. Quarrying in the inland Balkans conformed to the broader Roman imperial pattern of resource exploitation, where extraction was concentrated near settlements to minimise transportation costs.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Project Description</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This project focuses on local stone resources in the inland Balkans, drawing primarily on existing archaeological publications to establish the extent and nature of stone exploitation in the region. While several quarry sites were visited in the field, the project did not set out to identify previously unknown Roman quarries; it is acknowledged that more quarries and potential source areas likely exist beyond those presented on this map. The aim was rather to provide as comprehensive a regional overview of extraction activity as possible.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          As the inland Balkans also relied on stone imported from neighbouring regions, a selection of the quarries that most frequently supplied stone to the area has been included.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ borderLeft: 3, borderColor: 'divider', pl: 1.5 }}>
          <strong>Note:</strong> As the exact locations of some Roman quarries or potential stone source areas are not known, the mapped points represent approximate positions. In such cases, the nearest location to the modern settlement associated with the quarry or potential stone source area has been used. In other instances, quarries or potential source areas are represented within an approximate 5 km radius around a central point (such as a district, mountain, or ridge) or aligned with the geographical name identified in OpenStreetMap.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Future Directions</Typography>
        <Typography variant="body2" color="text.secondary">
          This project represents the current state of research and available data at the time of development. It is recognised that the number of Roman quarries and/or potential source areas in the inland Balkans was likely higher, and they could be incorporated to further improve the map. We welcome new information and would be happy to include new data if it is shared with us in the appropriate shapefile format.
        </Typography>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" gutterBottom>Authors and Contact</Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Ines Ferjan</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>Roman Archaeologist</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          During the course of my doctoral research, <em>The Roman Stone Trade in the Inland Balkans: Quarrying, Transport and Carving</em>, I examined both locally available and imported stone to analyse distribution patterns. This analysis allowed for the assessment of stone resources, further examination of potential transport routes, and carving practices, while also addressing questions related to workshop production, the dynamics between clients and producers, and the decision-making processes involved in commissioning stone products.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This project, <em>Roman Quarries of the Balkans</em>, forms a part of this wider research, which was conducted as part of a doctoral degree at the University of Edinburgh, under the supervision of Drs Ben Russell and Manuel Fernández-Götz.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2.5 }}>
          Contact: <Link href="mailto:ines.ferjan@ed.ac.uk">ines.ferjan@ed.ac.uk</Link>
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Gregor Boltic</Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>GIS Developer</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          I'm a guy who likes creating map-based web applications.
        </Typography>
        <Typography variant="body2">
          Contact: <Link href="mailto:gregor.boltic@gmail.com">gregor.boltic@gmail.com</Link>
        </Typography>

      </Box>

    </Box>
  )
}
