import React from 'react';
import DeckGL, {
  GeoJsonLayer,
  MapView,
  MapController
} from 'deck.gl';

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
            stroked: true,
            filled: true,
            wireframe: true,
            extruded: true,
            lineWidthMinPixels: 2,
            getLineWidth: 1,
            lineWidthScale: 20,
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
              if (sub === true && sel === false) {
                return [100, 100, 100, 0];
              }
              return [100, 100, 100, 255];
            },
            getFillColor: (f) => {
              const { region, adm0_a3: key } = f.properties;
              const sel = adm[key] === true;
              const sub = (region !== '');
              if (sub === true && sel === false) {
                return [200, 200, 200, 0]; // transparent
              }
              return sel ? [150, 150, 250, 255] : [200, 200, 200, 255];
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
