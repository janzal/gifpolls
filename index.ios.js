/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

import MainView from './js/views/MainView';

var GifPoll = React.createClass({
  render: function() {
    return (
      <MainView />
    );
  }
});

AppRegistry.registerComponent('GifPoll', () => GifPoll);
