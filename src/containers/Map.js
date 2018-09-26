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

  componentWillReceiveProps(props) {
    const { selected, lang } = props;
    // convert selected languages to countries
    const adm = Object.keys(selected).filter(f => selected[f] === true)
      .reduce((p, c) => ([...p, ...lang[c].countries]), []) // list of all countries
      .reduce((p, c) => ({ ...p, [c]: true }), {}); // uniq countries
    this.setState({ adm });
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

  setTooltip = (e) => {
    let condition = false;
    if (e.object) {
      const { region, adm0_a3: key } = e.object.properties;
      const sel = this.state.adm[key] === true;
      // const sub = (region !== '');
      condition = sel && region;
    }
    this.props.setTooltip(e, condition);
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
    const { map } = this.props;
    const { viewState } = this.state;

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
            lineWidthMinPixels: 1,
            getLineWidth: 1,
            lineWidthScale: 5,
            getLineColor: (f) => {
              const { region, adm0_a3: key } = f.properties;
              const sel = this.state.adm[key] === true;
              const sub = (region !== '');
              if (sub === true && sel === false) {
                // return [100, 100, 100, 0];
                return [50, 50, 50, 0];
              }
              return [128, 206, 206, 255];
            },
            getFillColor: (f) => {
              const { region, adm0_a3: key } = f.properties;
              const sel = this.state.adm[key] === true;
              const sub = (region !== '');
              if (sub === true && sel === false) {
                return [200, 200, 200, 0]; // transparent
              }
              return sel ? [217, 66, 102, 255] : [240, 248, 250, 255];
            },
            updateTriggers: {
              pickable: this.state.adm,
              getLineColor: this.state.adm,
              getFillColor: this.state.adm,
              getElevation: this.state.adm,
            },
            transitions: {
              getFillColor: 1000,
              geometry: 3000,
            },
            onHover: this.setTooltip,
            onClick: (e) => {
              // close all windows
              // sadly it works only when clicking on land
              this.props.updateUI({});
              this.setTooltip(e);
            }
          }),
        ]}
      />
    );
  }
}

export default Map;
