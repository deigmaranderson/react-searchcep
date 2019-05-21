import React, { Component } from "react";
import RenderMap from "./RenderMap";

class Content extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.callCep = this.callCep.bind(this);
        this.handler = this.handler.bind(this);
        this.mascaraCep = this.mascaraCep.bind(this);
        this.state = {
            cepHandle: null,
            cepReturned: null,
            lat: null,
            lng: null,
            isLoading: false,
            visible: true,
            erro: false
        };
    }

    callCep(data) {
        if (!data.hasOwnProperty('erro')) {
            const formatAddress = data.logradouro.split(' ').join('+')
            const formatLocal = data.localidade.split(' ').join('+')
            fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=Mjh9yH5FQo6edtgJKZe8CSi70AAhsRFj&inFormat=kvp&outFormat=json&location=${formatAddress}%20-%20${formatLocal}&thumbMaps=false`)
                .then(response => response.json())
                .then(ll => {
                    const latlgn = ll.results[0].locations[0].latLng
                    this.setState({
                        cepReturned: data,
                        lat: latlgn.lat,
                        lng: latlgn.lng,
                        visible: true,
                        isLoading: false,
                        erro: false
                    });
                });
        } else {
            this.setState({
                visible: true,
                isLoading: false,
                erro: true
            });
        }
    }

    validaCep(val) {
        const exp = /\d{5}-\d{3}/
        const cepTyped = val.target.value
        if (!exp.test(cepTyped)) {
            alert('Numero de Cep Invalido!')
        }
    }

    mascaraCep(val) {
        let cepTyped = val.target.value
        this.handler()
        if(cepTyped.length === 5) {
            let formatTyped = cepTyped
            val.target.value = formatTyped + '-'
        }
    }

    handler() {
        this.setState({
            cepReturned: null,
                        lat: null,
                        lng: null,
            visible: false
        })
    }

    handleChange(val) {
        this.setState({ cepHandle: val.target.value });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ isLoading: true, visible: false });
        var callbackName = 'callCep';
        window[callbackName] = data => {
            delete window[callbackName];
            document.body.removeChild(script);
            this.callCep(data);
        }
        var script = document.createElement('script');
        script.src = `https://viacep.com.br/ws/${this.state.cepHandle}/json/?callback=callCep`;
        document.body.appendChild(script);
    }

    render() {
        const { cepReturned, lat, lng, isLoading, visible, erro } = this.state;
        return (
            <div>
                <div className='card'>
                    <label>Consultar</label>
                    <input type='tel' name='searchCep' placeholder='Digite o CEP'
                        maxLength='9' onChange={this.handleChange}
                        onKeyPress={this.mascaraCep}
                        onBlur={this.validaCep}
                    />
                    <button onClick={this.handleClick}>Buscar</button>
                    {isLoading && <div>Carregando...</div>}
                </div>
                {cepReturned && visible ?
                    <RenderMap cep={cepReturned} lat={lat} lng={lng} visible={this.handler} /> :
                    (erro ? <div className='mapContainer'>Cep não localizado - Pesquise Novamente</div> : '')
                }
            </div>
        );
    }
}

export default Content