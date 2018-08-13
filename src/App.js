import React from 'react';
import { Provider, observer } from 'mobx-react';
// import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
// import { YMInitializer } from 'react-yandex-metrika';

// import { YmId } from './metrikaHelper';

// import AppRouter from './routes';
import Map from './containers/Map';
import LanguageSetup from './containers/LanguageSetup';

const UI = () => (
  <div>
    <Map />
    <LanguageSetup />
  </div>
);

@observer
class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <UI />
      </Provider>
    );
  }
}

export default App;
