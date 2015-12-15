import React from 'react-native';
import {
  Navigator,
  Component
} from 'react-native';

import styles from './styles';

import HomeView from './HomeView';

export default class MainView extends Component {
    renderScene(route, navigator) {
      console.log(route);
      const routes = {
        home: <HomeView />
      };

      return routes[route.name];
    }

    render() {
      return (
        <Navigator initialRoute={{ name: 'home', index: 0}}
          renderScene={this.renderScene} />
      )
    }
}
