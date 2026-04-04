import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import quarriesData from '../data/quarries.geojson'

// Fix Leaflet's default marker icons broken by Vite's asset pipeline
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

const MAP_CENTER = [44.0, 18.5]
const MAP_ZOOM = 7
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
      <TileLayer
        attribution='&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://api.thunderforest.com/landscape/{z}/{x}/{y}{r}.png?apikey=${THUNDERFOREST_KEY}`}
        maxZoom={22}
      />

      <MarkerClusterGroup chunkedLoading>
        {features.map((feature) => {
          const [lng, lat] = feature.geometry.coordinates
          return (
            <Marker
              key={feature.properties.fid}
              position={[lat, lng]}
              eventHandlers={{ click: () => onFeatureSelect(feature) }}
            />
          )
        })}
      </MarkerClusterGroup>

      <MapController onMapReady={onMapReady} />
    </MapContainer>
  )
}
