import React from 'react-native';
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
} from 'react-native';

import md5 from 'md5';

export default class Users extends Component {
  generateGravatarURL(email) {
    const hash = md5(email.toLowerCase().trim());
    return `http://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const images = this.props.emails.map(email => {
      return (<Image
        key={email}
        style={{width: 80, height: 80, borderRadius: 40}}
        source={this.generateGravatarURL(email)}
      />);
    });

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {images}
      </View>
    );
  }
}

Users.propTypes = {
  users: React.PropTypes.array
};

Users.defaultProps = {
  users: []
};
