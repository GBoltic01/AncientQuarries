import L from 'leaflet'
import iconUrl from './pickaxe.svg'
import shadowUrl from './markers-shadow.png'

function pinIcon(color) {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 50px; height: 50px;">

        <!-- Shadow image, offset like awesome-markers -->
        <img src="${shadowUrl}" style="
          position: absolute;
          top: 28px; left: 8px;
          width: 42px; height: 20px;
          pointer-events: none;
        "/>

        <!-- Pin body -->
        <div style="
          width: 32px; height: 32px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          position: absolute; top: 0; left: 4px;
          border: 2px solid rgba(0,0,0,0.15);
        ">
          <!-- Counter-rotated icon wrapper — keeps icon centered and upright -->
          <div style="
            width: 100%; height: 100%;
            transform: rotate(45deg);
            display: flex; align-items: center; justify-content: center;
          ">
            <img src="${iconUrl}" style="width: 15px; height: 15px; filter: brightness(0) invert(1);"/>
          </div>
        </div>

      </div>
    `,
    className: '',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -44],
  })
}

export function getQuarryIcon(status) {
  return status === 'Confirmed' ? pinIcon('#388E3C') : pinIcon('#D97706')
}
