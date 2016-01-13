import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  StyleSheet,
  LayoutAnimation,
  AlertIOS,
  ScrollView
} from 'react-native';

import PollsRepository from '../model/PollsRepository';

import globalStyles from './styles';
const styles = StyleSheet.create({
  createForm: {
    padding: 5
  },

  addOptionButton: {

  },

  createButton: {
    backgroundColor: '#3FAA87'
  },

  pollOptions: {
    paddingLeft: 20,
    paddingRight: 20
  },

  pollOption: {
    borderColor: '#EA5779',
    // borderWidth: 1,
    padding: 5,
    paddingBottom: 4,
    marginTop: 5,

    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 3
  },

  formTitle: {
    fontWeight: 'bold',
    fontSize: 15
  }
});
Object.assign(styles, globalStyles);

import PollResults from './components/PollResults';
import PollVoting from './components/PollVoting';
import GifFeed from './components/GifFeed';
import Spinner from './components/Spinner';

class PollOption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      description: this.props.description,
      editable: this.props.editable
    };
  }

  getValues() {
    return {
      title: this.state.title,
      description: this.state.description
    };
  }

  isEmpty() {
    return !this.state.title;
  }

  clear() {
    this.setState({
      title: '',
      description: ''
    });
  }

  render() {
    let pollOption = null;

    if (this.state.editable) {
      pollOption = (
        <View style={{ marginBottom: 5 }}>
          <Text style={{ marginBottom: 2 }}>Title</Text>
          <TextInput style={[styles.input]}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(title) => this.setState({
              title
            })}
            value={this.state.title}
            />

          <Text style={{ marginTop: 10, marginBottom: 2 }}>Desciption</Text>
          <TextInput style={[styles.input]}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(description) => this.setState({
              description
            })}
            value={this.state.description}
            />
        </View>
      );
    } else {
      let description = null;
      if (this.state.description) {
        description = (
          <Text style={{ marginBottom: 2, fontWeight: 'bold' }}>Description:&nbsp;
            <Text style={{ fontWeight: 'normal' }}>{this.state.description}</Text>
          </Text>
        );
      }

      pollOption = (
        <View>
          <Text style={{ fontWeight: 'bold' }}>Title:&nbsp;
            <Text style={{ fontWeight: 'normal' }}>{this.state.title}</Text>
          </Text>
          {description}
        </View>
      );
    }

    return (
      <View style={styles.pollOption}>
        {pollOption}
      </View>
    );
  }
}

PollOption.defaultProps = {
  title: '',
  description: '',
  editable: false
};

export default class CreateChannelView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voteOptions: [],
      userEmail: '',
      maxVotes: '1',
      channelName: '',
      processing: false
    };
  }

  handleCreatePress_() {
    this.setState({ processing: true });

    PollsRepository().addPoll(this.state.channelName, {
      voteOptions: this.state.voteOptions,
      maxVotes: Number.parseInt(this.state.maxVotes)
    }).then(() => {
      this.setState({ processing: false });
      this.props.navigator.replace({
        name: 'channel',
        passProps: {
          channelName: this.state.channelName,
          userEmail: this.state.userEmail
        }
      });
    }).catch((err) => {
      this.setState({ processing: false });
      AlertIOS.alert('Error', 'Cannot create this poll. Sorry for that.');
      console.error(err);
    });
  }

  handleAddOptionPress_() {
    const newOption = this.refs.newOption;

    if (newOption.isEmpty()) {
      AlertIOS.alert('Incomplete entry', 'Form is not filled properly');
      return;
    }

    const newOptionEntry = newOption.getValues();

    const voteOptions = this.state.voteOptions;
    voteOptions.push(newOptionEntry);

    this.setState({ voteOptions });

    newOption.clear();
  }

  render() {
    let pollOptions = null;

    if (this.state.voteOptions.length) {
      pollOptions = (
        <View>
          {this.state.voteOptions.map((option, index) => {
              return (
                <PollOption key={index}
                  title={option.title}
                  description={option.description} />
              );
          })}
        </View>
      );
    }

    let createButton = <View style={{ marginTop: 10 }}><Spinner /></View>;

    if (!this.state.processing) {
      createButton = (
        <TouchableHighlight style={{ marginTop: 10 }} onPress={this.handleCreatePress_.bind(this)}>
          <View style={[styles.button, styles.createButton]}>
            <Text style={styles.buttonText}>Create</Text>
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <View style={[styles.container, styles.createChannelContainer]}>
        <Text style={[styles.header, styles.channelHeader]}>Create poll</Text>

        <ScrollView style={styles.createForm}>
          <Text style={[styles.formTitle, { marginBottom: 2 }]}>Poll name</Text>
          <TextInput style={[styles.input]}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(channelName) => this.setState({
              channelName
            })}
            value={this.state.channelName}
            />

          <Text style={[styles.formTitle, { marginBottom: 2 }]}>Your email</Text>
          <TextInput style={[styles.input]}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(userEmail) => this.setState({
              userEmail
            })}
            value={this.state.userEmail}
            />

          <Text style={[styles.formTitle, { marginBottom: 2, marginTop: 20 }]}>Maximum votes</Text>
          <TextInput style={[styles.input]}
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText={(maxVotes) => this.setState({
              maxVotes
            })}
            value={this.state.maxVotes}
            />

          <Text style={[styles.formTitle, { marginBottom: 10, marginTop: 20 }]}>Options</Text>
          <View style={styles.pollOptions}>
            {pollOptions}
            <PollOption editable={true} ref='newOption'/>
            <TouchableHighlight style={{ marginTop: 10 }}
              onPress={this.handleAddOptionPress_.bind(this)}>
              <View style={[styles.button, styles.addOptionButton]}>
                <Text style={styles.buttonText}>Add option</Text>
              </View>
            </TouchableHighlight>
          </View>

          {createButton}
        </ScrollView>
      </View>
    );
  }
}
