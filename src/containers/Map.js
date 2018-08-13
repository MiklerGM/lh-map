import React from 'react';
import DeckGL, {
  GeoJsonLayer,
  MapView,
} from 'deck.gl';
import { inject, observer } from 'mobx-react';

const GEOJSON =
  'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson'; //eslint-disable-line


@inject('store')
@observer
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
    return new MapView({
      id: 'id-view',
      width: this.state.width,
      height: this.state.height,
      controller: true
    });
  }

  resize() {
    this.setState({ width: window.innerWidth });
    this.setState({ height: window.innerHeight });
  }

  updateViewState(value) {
    this.setState({ viewState: value });
  }

  render() {
    return (
      <DeckGL
        views={this.view}
        viewState={this.state.viewState}
        onViewStateChange={v => this.updateViewState(v.viewState)}
        layers={[
          new GeoJsonLayer({
            id: 'geojson-layer',
            data: GEOJSON,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            getLineColor: () => [255, 255, 255],
            getFillColor: d => this.props.store.data.countries.includes(d.properties.name) ? [150, 150, 250] : [200, 200, 200]
          })
        ]}
      />
    );
  }
}

export default Map;
