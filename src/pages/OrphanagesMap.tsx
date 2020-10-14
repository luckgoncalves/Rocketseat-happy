import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import api from 'services/api'
import mapMarkerImg from 'assets/images/map-marker.svg'
import mapIcon from 'utils/mapIcon'
import 'styles/pages/orphanages.css'

interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

function OrphanagesMap (){
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

  useEffect( () => {
    api.get('/orphanages').then(res => {
      setOrphanages(res.data)
      })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Curitiba</strong>
          <span>Paraná</span>
        </footer>
      </aside>
      
      <Map
        center={[-25.5128482,-49.2537338]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}>
          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
          {orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapIcon}
                position={[orphanage.latitude,orphanage.longitude]}
              >
                <Popup closeButton={false} minWidth={240} className="map-popup">
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            )
          })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanages">
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  );
}

export default OrphanagesMap;