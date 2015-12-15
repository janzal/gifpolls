import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component
} from 'react-native';

import styles from './styles';

export default class HomeView extends Component {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>GIF Polls</Text>
          <View style={styles.channelActions}>
            <TextInput style={[styles.input, styles.channelInput]}
              autoCapitalize="none"
              autoCorrect={false} />

            <TouchableHighlight>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Join</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.createButton}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Create</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
}
