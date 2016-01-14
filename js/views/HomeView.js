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
      channelName: '',
      userEmail: ''
    };
  }

  handleJoinPress_(e) {
    if (!this.state.channelName) {
      AlertIOS.alert('Channel name', 'You must enter a poll channel name');
      return;
    }

    if (!this.state.userEmail) {
      AlertIOS.alert('Email', 'You must enter an email');
      return;
    }

    this.props.navigator.push({
      name: 'channel',
      passProps: {
        channelName: this.state.channelName,
        userEmail: this.state.userEmail
      }
    });
  }

  handleCreatePress_() {
    this.props.navigator.push({
      name: 'create'
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
              placeholder="Channel name"
              value={this.state.channelName}
              />
            <TextInput style={[styles.input, styles.channelInput]}
              autoCapitalize="none"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={(userEmail) => this.setState({
                userEmail
              })}
              value={this.state.userEmail}
              />

            <TouchableHighlight onPress={this.handleJoinPress_.bind(this)}>
              <View style={[styles.button, styles.joinButton]}>
                <Text style={styles.buttonText}>Join</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={[{ marginTop: 100 }, styles.createButton]} onPress={this.handleCreatePress_.bind(this)}>
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
