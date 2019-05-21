import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";

//**
//* Utilizado com Google Maps API
//*

export class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        let { cep, lat, lng } = this.props;
        lat =  -23.62774;
        lng = -46.59409;
        const style = {
            width: '600px',
            height: '400px'
        }
        if (cep.erro) {
            return (
                <div>
                    <h1>Cep não localizado</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{cep.logradouro}</h1>
                    <p>{cep.bairro}</p>
                    <p>{cep.localidade} - {cep.uf}</p>
                    <p>{cep.cep}</p>
                    <div className='container'>
                        <Map
                            google={this.props.google}
                            zoom={14}
                            style={style}
                            initialCenter={{ lat: lat, lng: lng }}
                        >
                            <Marker
                                name={cep.logradouro}
                            />
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                                onClose={this.onClose}
                            >
                                <div>
                                    <h4>{cep.logradouro}</h4>
                                </div>
                            </InfoWindow>
                        </Map>
                    </div>
                </div>
            )
        }
    }
}

export default GoogleApiWrapper({
    apiKey: 'APIKEY',
})(MapComponent);