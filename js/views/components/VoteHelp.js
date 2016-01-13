import React from 'react-native';
import {
  View,
  Image,
  Text,
  Component
} from 'react-native';

import Spinner from './Spinner';

import md5 from 'md5';

export default class VoteHelp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: null,
      image: null
    };
  }

  getHelp() {
    return fetch('http://yesno.wtf/api')
      .then((res) => {
        return res.json();
      });
  }

  render() {
    let answer = (<View style={{width: 300, height: 300}}><Spinner /></View>);
    if (this.state.answer) {
      answer = (<View>
        <Text style={{fontSize: 40, textAlign: 'center', margin: 5, width: 300, color: '#fff'}}>{this.state.answer.toUpperCase()}</Text>
        <Image
          style={{width: 300, height: 300}}
          source={{ uri: this.state.image }}
        />
      </View>);
    } else {
      this.getHelp()
        .then((res) => {
          this.setState({
            answer: res.answer,
            image: res.image
          });

          console.log(res);
        });
    }

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {answer}
      </View>
    );
  }
}
