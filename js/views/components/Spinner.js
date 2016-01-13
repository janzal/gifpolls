import React from 'react-native';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
} from 'react-native';

export default class Spinner extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicatorIOS
          size='large'
          color='#687B74'
          />
      </View>
    );
  }
}
