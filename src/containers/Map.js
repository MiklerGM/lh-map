import React from 'react';
import DeckGL, {
  GeoJsonLayer,
  MapView,
} from 'deck.gl';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeigh,
      viewState: {
        longitude: 0,
        latitude: 0,
        zoom: 1,
        pitch: 0,
        bearing: 0
      }
    };
  }

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
      controller: true
    });
  }

  resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  updateViewState(value) {
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
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            getElevation: (f) => {
              const { name, admin, adm0_a3 } = f.properties;
              if (name === admin) { // Spain
                return adm[adm0_a3] === true ? 100 : 10;
              }
              // region
              return adm[adm0_a3] === true ? 110 : 0;
            },
            // lineWidthMinPixels: 2,
            getLineColor: () => [100, 100, 100],
            getFillColor: (f) => {
              const { name, admin, adm0_a3 } = f.properties;
              const sel = adm[adm0_a3];
              const sub = (name !== admin);
              if (sub === true && sel === false) {
                return [200, 200, 200, 0]; // transparent
              }
              return sel ? [150, 150, 250, 255] : [200, 200, 200, 255];
            },
            updateTriggers: {
              getFillColor: adm,
              getElevation: adm,
            },
            transitions: {
              getFillColor: 1000,
              getElevation: 1000,
              geometry: 3000,
            }
          })
        ]}
      />
    );
  }
}

export default Map;
