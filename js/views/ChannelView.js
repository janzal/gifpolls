import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Component,
  LayoutAnimation
} from 'react-native';

import md5 from 'md5';

import styles from './styles';

import PollResults from './components/PollResults';
import PollVoting from './components/PollVoting';
import Users from './components/Users';
import Spinner from './components/Spinner';

import PollsRepository from '../model/PollsRepository';

export default class ChannelView extends Component {
  constructor(props) {
      super(props);

      this.state = {
        voteOptions: [],
        users: [
          this.props.userEmail
        ],
        usedVotes: 0,
        maxVotes: 1
      };
  }

  generateGravatarURL(email) {
    const hash = md5(email.toLowerCase().trim());
    return `http://www.gravatar.com/avatar/${hash}`;
  }

  attachPollChangesHandler() {
    PollsRepository().setResultsChangesListener(this.props.channelName, snapshot => {
      const val = snapshot.val();
      const voteOptions = val.voteOptions;
      const maxVotes = val.maxVotes;
      const images = Object.keys(val.images || {}).map(key => val.images[key]);

      if (!voteOptions) {
        this.props.navigator.pop();
        return;
      }

      LayoutAnimation.spring();
      this.setState({ voteOptions, maxVotes, images, pollLoaded: true });
    });

    PollsRepository().setUsersChangesListener(this.props.channelName, snapshot => {
      const val = snapshot.val();
      // const users = val.users || [];
      const users = [];

      LayoutAnimation.spring();
      this.setState({ users });
    });
  }

  componentDidMount() {
    this.attachPollChangesHandler();
    PollsRepository().addUser(this.props.channelName, this.props.userEmail);

    // setTimeout(() => {
    //   LayoutAnimation.easeInEaseOut();
    //   this.setState({ imagesLoaded: true })
    // }, 3000);
  }

  componentWillUnmount() {
    PollsRepository().addUser(this.props.channelName, this.props.userEmail);
  }

  handleVoting(optionId) {
    const voteOptions = this.state.voteOptions;
    voteOptions[optionId].score++;

    let usedVotes = this.state.usedVotes + 1;

    PollsRepository().vote(this.props.channelName, optionId);

    this.setState({ voteOptions, usedVotes });
  }

  render() {
    let pollVoting = <Spinner />;
    let usersList = <Spinner />;

    if (this.state.pollLoaded) {
      pollVoting =  (<View>
                      <PollResults voteOptions={this.state.voteOptions} />
                      <PollVoting voteOptions={this.state.voteOptions} onVote={this.handleVoting.bind(this)} />
                    </View>);
    }

    if (this.state.imagesLoaded) {
      usersList = <Users urls={this.state.users}/>;
    }

    return (
      <View style={[styles.container, styles.channelContainer]}>
        <Text style={[styles.header, styles.channelHeader]}>#{this.props.channelName}</Text>
        <Image
          style={{width: 80, height: 80, borderRadius: 40, alignSelf: 'center'}}
          source={{uri: this.generateGravatarURL(this.props.userEmail)}} />
        {pollVoting}
      </View>
    );
  }
}
