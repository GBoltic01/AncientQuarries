import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, LayersControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import quarriesData from '../data/quarries.geojson'
import { getQuarryIcon } from '../utils/quarryIcon'

const CLUSTER_COLOR = '#388E3C'

function createClusterIcon(cluster) {
  const count = cluster.getChildCount()
  return L.divIcon({
    html: `
      <div style="
        width: 38px; height: 38px;
        background: ${CLUSTER_COLOR};
        border: 6px solid rgba(25, 112, 29, 0.65);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        color: white; font-weight: 700; font-size: 14px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        opacity: 0.75;
      ">${count}</div>
    `,
    className: '',
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  })
}

const MAP_CENTER = [42.0, 18.5]
const MAP_ZOOM = 6
const THUNDERFOREST_KEY = import.meta.env.VITE_THUNDERFOREST_API_KEY

// Inner component — can use react-leaflet hooks
function MapController({ onMapReady }) {
  const map = useMap()
  useEffect(() => {
    onMapReady(map)
  }, [map, onMapReady])
  return null
}

export default function MapView({ onFeatureSelect, onMapReady }) {
  const features = quarriesData.features

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      style={{ height: '100%', width: '100%' }}
    >
      <LayersControl position="bottomleft">
        <LayersControl.BaseLayer checked name="Landscape">
          <TileLayer
            attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://api.thunderforest.com/landscape/{z}/{x}/{y}{r}.png?apikey=${THUNDERFOREST_KEY}`}
            maxZoom={22}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxZoom={19}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon} showCoverageOnHover={false}>
        {features.map((feature) => {
          const [lng, lat] = feature.geometry.coordinates
          return (
            <Marker
              key={feature.properties.fid}
              position={[lat, lng]}
              icon={getQuarryIcon(feature.properties.STATUS)}
              eventHandlers={{ click: () => onFeatureSelect(feature) }}
            />
          )
        })}
      </MarkerClusterGroup>

      <MapController onMapReady={onMapReady} />
    </MapContainer>
  )
}
