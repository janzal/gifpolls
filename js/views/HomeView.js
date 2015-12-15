import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  AlertIOS
} from 'react-native';

import styles from './styles';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: ''
    };
  }

  handleJoinPress_(e) {
    if (!this.state.channelName) {
      AlertIOS.alert('Channel name', 'You must enter a poll channel name');
      return;
    }

    this.props.navigator.push({
      name: 'channel',
      passProps: {
        channelName: this.state.channelName
      }
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.homeContainer]}>
        <View style={styles.loginContainer}>
          <Text style={styles.header}>Polls</Text>
          <View style={styles.channelActions}>
            <TextInput style={[styles.input, styles.channelInput]}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(channelName) => this.setState({
                channelName
              })}
              value={this.state.channelName}
              />

            <TouchableHighlight onPress={this.handleJoinPress_.bind(this)}>
              <View style={[styles.button, styles.joinButton]}>
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

        <View style={styles.footer}>
          <Text style={styles.author}>Jan Žaloudek</Text>
        </View>
      </View>
    );
  }
}
