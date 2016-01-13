import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  StyleSheet,
  LayoutAnimation,
  Modal
} from 'react-native';

import {VibrancyView, BlurView} from 'react-native-blur';

import VoteHelp from './VoteHelp';

import globalStyles from '../styles';
const styles = StyleSheet.create({
  votingContainer: {
    backgroundColor: '#F7EEF0',
    padding: 2,
  },
  voteButtonWrapper: {
    margin: 1,
    flex: 1,
    marginRight: 0
  },
  voteButton: {
    backgroundColor: '#3FAA87',
    height: 60,
    // width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    minWidth: 30,
    flex: 1,
    marginRight: 0
  },
  voteButtonText: {
    color: '#F7EEF0',
    fontSize: 20
  },
  helpButtonWrapper: {
    margin: 1,
    // flex: 1,
    marginRight: 0,
    marginTop: 30,
    alignSelf: 'center',
    width: 150
  },
  helpButton: {
    backgroundColor: '#F94871',
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    minWidth: 30,
    flex: 1,
    marginRight: 0
  },
  helpButtonText: {
    color: '#F7EEF0',
    fontSize: 15
  },
  votingButtons: {

  },
  voteDescription: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    margin: 1,
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3
  },
  voteDescriptionText: {
    color: '#EA5779'
  }
});
Object.assign(styles, globalStyles);

class VoteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    };
  }

  handleVotePress(e) {
    this.props.onVote();
  }

  handleVoteLongPress() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showDescription: true });
  }

  handleVotePressOut() {
    this.setState({ showDescription: false });
  }

  render() {
    let description = null;

    if (this.state.showDescription) {
      description = (<View style={styles.voteDescription}>
        <Text style={styles.voteDescriptionText}>{this.props.description}</Text>
      </View>);
    }

    return (
      <View>
        <TouchableHighlight
          onLongPress={this.handleVoteLongPress.bind(this)}
          onPress={this.handleVotePress.bind(this)}
          onPressOut={this.handleVotePressOut.bind(this)}
          style={styles.voteButtonWrapper}>
          <View style={styles.voteButton}>
            <Text style={styles.voteButtonText} numberOfLines={2}>{this.props.children}</Text>
          </View>
        </TouchableHighlight>
        {description}
      </View>
    );
  }
}

VoteButton.propTypes = {
  onVote: React.PropTypes.func
};

VoteButton.defaultProps = {
  onVote: function(){}
};

export default class PollVoting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHelp: false
    }
  }

  render() {
    const voteHelp = this.state.showHelp ? (
      <View>
        <Modal
          aniamted={true}
          transparent={true}
          visible={this.state.showHelp}>
          <BlurView  blurType='dark' style={{flex: 1}}>
            <View style={{ marginTop: 100, marginBottom: 150, alignSelf: 'center', justifyContent: 'center', flex: 1}}>
              <VoteHelp />
              <TouchableHighlight
                onPress={()=>{
                  const showHelp = false;

                  this.setState({ showHelp });
                }}
                style={styles.helpButtonWrapper}>
                <View style={[styles.helpButton, {backgroundColor: null, borderWidth: 1, borderColor: '#000' }]}>
                  <Text style={[styles.helpButtonText, {color: '#000000' }]}>Thank you! &#10084;</Text>
                </View>
              </TouchableHighlight>
            </View>
          </BlurView>
        </Modal>
      </View>
    ) : null;

    return (
      <View style={[styles.votingContainer]}>
        <View style={styles.votingButtons}>
          {
            this.props.voteOptions.map((option, index) =>
              <VoteButton key={index}
                description={option.description}
                onVote={this.props.onVote.bind(this, index)}>
                {option.title}
              </VoteButton>)
          }
          <View>
            <TouchableHighlight
              onPress={()=>{
                const showHelp = !this.state.showHelp;

                this.setState({ showHelp });
              }}
              style={styles.helpButtonWrapper}>
              <View style={styles.helpButton}>
                <Text style={styles.helpButtonText}>I need help!</Text>
              </View>
            </TouchableHighlight>
            {voteHelp}
          </View>
        </View>
      </View>
    );
  }
}

PollVoting.propTypes = {
  onVote: React.PropTypes.func
}

PollVoting.defaultProps = {
  voteOptions: [],
  onVote: function(){}
};
