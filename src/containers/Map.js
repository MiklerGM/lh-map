import React from 'react';
import DeckGL, {
  GeoJsonLayer,
  MapView,
  MapController
} from 'deck.gl';

const LIGHT_SETTINGS = {
  lightsPosition: [-90, 45, 2000, -90, -45, 2000, 90, 45, 2000, 90, -45, 2000], // xyz for all lights
  ambientRatio: 0.62,
  diffuseRatio: 0.01, // with value 1 - borders are not visible,
  specularRatio: 1, // dunno what this thing do
  lightsStrength: [0.4, 0, 0.4, 0, 0.4, 0, 0.4, 0],
  numberOfLights: 4 // number of lights. max 5.
};


class Map extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeigh,
    viewState: window.store.viewState === null
      ? {
        longitude: 0,
        latitude: 0,
        zoom: 1,
        pitch: 0,
        bearing: 0
      }
      : window.store.viewState,
  };

  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize(), false);
  }

  get view() {
    const { width, height } = this.state;
    return new MapView({
      id: 'id-view',
      width,
      height,
      controller: { type: MapController, dragRotate: false }
    });
  }

  resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  updateViewState(value) {
    window.store.viewState = value;
    this.setState({ viewState: value });
  }

  render() {
    const { map, selected, lang } = this.props;
    const { viewState } = this.state;
    // convert selected languages to countries
    const adm = Object.keys(selected).filter(f => selected[f] === true)
      .reduce((p, c) => ([...p, ...lang[c].countries]), []) // list of all countries
      .reduce((p, c) => ({ ...p, [c]: true }), {}); // uniq countries

    return (
      <DeckGL
        views={this.view}
        viewState={viewState}
        onViewStateChange={v => this.updateViewState(v.viewState)}
        layers={[
          new GeoJsonLayer({
            id: 'geojson-layer',
            data: map,
            pickable: true,
            // fp64: true,
            stroked: true,
            filled: true,
            wireframe: true,
            extruded: true,
            lineWidthMinPixels: 3,
            getLineWidth: 3,
            lineWidthScale: 5,
            lightSettings: LIGHT_SETTINGS,
            getElevation: (f) => {
              const { region, adm0_a3: key } = f.properties;
              if (region === '') { // Spain
                return adm[key] === true ? 1000 : 10;
              }
              // region
              return adm[key] === true ? 110 : 0;
            },
            getLineColor: (f) => {
              const { region, adm0_a3: key } = f.properties;
              const sel = adm[key] === true;
              const sub = (region !== '');
              // console.log('getlinecolor', f.type, f.geometry.type);
              if (sub === true && sel === false) {
                // return [100, 100, 100, 0];
                return [50, 50, 50, 0];
              }
              return [128, 206, 206, 255];
            },
            getFillColor: (f) => {
              const { region, adm0_a3: key } = f.properties;
              const sel = adm[key] === true;
              const sub = (region !== '');
              if (sub === true && sel === false) {
                return [200, 200, 200, 0]; // transparent
              }
              return sel ? [217, 66, 102, 255] : [240, 248, 250, 255];
            },
            updateTriggers: {
              getLineColor: adm,
              getFillColor: adm,
              getElevation: adm,
            },
            transitions: {
              getFillColor: 1000,
              getElevation: 1000,
              geometry: 3000,
            },
            onHover: e => this.props.setTooltip(e),
            onClick: e => this.props.setTooltip(e)
          })
        ]}
      />
    );
  }
}

export default Map;
