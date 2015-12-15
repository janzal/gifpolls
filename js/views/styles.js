import {React, StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6596AE',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#CAE1EC'
  },
  input: {
    backgroundColor: '#FFC121',
    height: 40,
    fontSize: 20
  },
  channelInput: {
    marginBottom: 2,
    textAlign: 'center'
  },
  channelActions: {
    marginTop: 10,
    width: 180,
    alignSelf: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: '#C42900',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20
  },
  createButton: {
    marginTop: 50
  }
});
