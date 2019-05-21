import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
   iconUrl: icon,
   shadowUrl: iconShadow,
   iconSize: [24,36],
   iconAnchor: [12,36]
 });

 L.Marker.prototype.options.icon = DefaultIcon; 
class RenderMap extends Component {
  constructor() {
    super()
    this.hide = this.hide.bind(this)
  }

  hide(event) {
    event.preventDefault();
  }

  render() {
    const cep = (this.props.cep)
    if (this.props.lat !== null && cep.erro !== true) {
      return (
        <div className="mapContainer">
          <button className='close' onClick={this.props.visible}>X</button>
          <h1>{cep.logradouro}</h1>
          <p>{cep.bairro}</p>
          <p>{cep.localidade} - {cep.uf}</p>
          <p>{cep.cep}</p>
          <LeafletMap style={{ width: '100%', height: '300px' }}
            center={[this.props.lat, this.props.lng]}
            zoom={16}
            maxZoom={20}
            attributionControl={false}
            zoomControl={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            dragging={false}
            animate={true}
            easeLinearity={0.35}
          >
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
            <Marker position={[this.props.lat, this.props.lng]} />
          </LeafletMap>
        </div>
      );
    }
  }
}

export default RenderMap