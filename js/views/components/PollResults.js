import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  StyleSheet
} from 'react-native';

import globalStyles from '../styles';
const styles = StyleSheet.create({
  resultsContainer: {
    // backgroundColor: '#FFFFFF',
    marginTop: 30,
    marginBottom: 10,
    padding: 2
  }
});
Object.assign(styles, globalStyles);

class VotingResultBar extends Component {
  render() {
    const bars = this.props.voteOptions.map((opt, index) => {
      const barColor = VotingResultBar.colors[index % VotingResultBar.colors.length];
      const barFlex = opt.score;

      return (
        <View
          key={index}
          style={{ flex: barFlex, backgroundColor: barColor, height: 10 }}>
        </View>
      );
    });

    const legend = this.props.voteOptions.map((opt, index) => {
      const barColor = VotingResultBar.colors[index % VotingResultBar.colors.length];

      return (
        <View key={index} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View
            style={{ width: 10, height: 10, margin: 5, backgroundColor: barColor }}>
          </View>
          <Text>
            {opt.title} <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#AAA'}}>{opt.score}</Text>
          </Text>
        </View>
      );
    });

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          {bars}
        </View>
        {legend}
      </View>
    );
  }
}

VotingResultBar.colors = [
  '#A33',
  '#3A3',
  '#33A',
  '#AAA'
];

VotingResultBar.defaultProps = {
    voteOptions: [1,2,3],
};

export default class PollResults extends Component {
    render() {
      return (
        <View style={[styles.resultsContainer]}>
          <VotingResultBar {...this.props}/>
        </View>
      );
    }
}

PollResults.defaultProps = {
  voteOptions: []
};
