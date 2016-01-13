import React from 'react-native';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  StyleSheet,
  ListView,
  Image,
  Dimensions
} from 'react-native';

import globalStyles from '../styles';
const styles = StyleSheet.create({
  gifsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    // width: 150,
    // height: 150,
    backgroundColor: 'red'
  },
  listImageWrapper: {
    alignItems: 'center'
  },
  listImage: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: 'black'
  }
});
Object.assign(styles, globalStyles);

class  Thumb extends Component {
  render() {
    return (
      <Image source={{ uri: this.props.url }} style={styles.listImage}
        resizeMode='contain'
        />
    );
  }
}

export default class GifFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images
    }
  }

  renderRow_(data) {
    const windowWidth = Dimensions.get('window').width;
    return (
      <View style={[styles.listImageWrapper, { width: windowWidth }]}>
        <Image source={{ uri: data }} style={styles.listImage}
          resizeMode='contain'
          />
      </View>
    );
  }

  render() {
    console.log(this.state.images);
    return (
      <View style={[styles.gifsContainer]}>
        {this.state.images.map((image, index) => {
          <Thumb url={image} />
        })}
      </View>
    );
  }
}

GifFeed.propTypes = {
  images: React.PropTypes.array
};

GifFeed.defaultProps = {
  images: []
};
