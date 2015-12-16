import React from 'react-native';
import {
  Navigator,
  Component
} from 'react-native';

import styles from './styles';

import HomeView from './HomeView';
import CreateChannelView from './CreateChannelView';
import ChannelView from './ChannelView';

export default class MainView extends Component {
    renderScene(route, nav) {
      const routes = {
        home: <HomeView navigator={nav} {...route.passProps} />,
        create: <CreateChannelView navigator={nav} {...route.passProps} />,
        channel: <ChannelView navigator={nav} {...route.passProps} />
      };

      return routes[route.name];
    }

    render() {
      // const initialRoute = { name: 'channel', passProps: { channelName: 'HelloAdelle' } };
      const initialRoute = { name: 'home' };
      // const initialRoute = { name: 'create' };
      return (
        <Navigator initialRoute={initialRoute}
          renderScene={(route, nav) => this.renderScene(route, nav)} />
      )
    }
}
