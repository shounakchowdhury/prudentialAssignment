import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withAnchorPoint } from 'react-native-anchor-point';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const BACK = require('./images/back.png');
const MAN = require('./images/man.png');
const GOOD_SELECTED = require('./images/goodSelected.png');
const GOOD = require('./images/good.png');
const AVERAGE_SELECTED = require('./images/averageSelected.png');
const AVERAGE = require('./images/average.png');
const BAD = require('./images/bad.png');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          value: 86,
          text: '六',
          selected: false,
          animation: new Animated.Value(0),
        },
        {
          value: 80,
          text: '日',
          selected: false,
          animation: new Animated.Value(0),
        },
        {
          value: 40,
          text: '一',
          selected: false,
          animation: new Animated.Value(0),
        },
        {
          value: 90,
          text: '二',
          selected: false,
          animation: new Animated.Value(0),
        },
        {
          value: 92,
          text: '三',
          selected: false,
          animation: new Animated.Value(0),
        },
        {
          value: 97,
          text: '四',
          selected: false,
          animation: new Animated.Value(0),
        },
        {
          value: 81,
          text: '五',
          selected: false,
          animation: new Animated.Value(0),
        },
      ],
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    const { data } = this.state;
    data.forEach((item, id) => {
      Animated.timing(
        item.animation,
        {
          toValue: 100,
          duration: id * 200,
          useNativeDriver: true,
        }
      ).start();
    })
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Image
          source={BACK}
          style={styles.back}
        />
        <Text style={styles.headerText}>
          历史心情指数
        </Text>
      </View>
    );
  }

  getBarHeight = (value) => {
    return 0.32 * value / 100;
  }

  getBorderColor = (value) => {
    if (value >= 80 && value < 90) {
      return '#DCFFD6';
    } else if (value >= 90) {
      return '#FFE9D4';
    }
    return '#FFFFFF';
  }

  getSelectedBarColor = (value) => {
    if (value >= 80 && value < 90) {
      return ['#42F373', '#A1FD44', '#DCFFD6'];
    } else if (value >= 90) {
      return ['#FFA14A', '#FFCC4A', '#FFE9D4'];
    }
    return ['#CFCFCF', '#CFCFCF'];
  }

  getBarImage = (value, selected) => {
    if (value >= 80 && value < 90) {
      return selected ? AVERAGE_SELECTED : AVERAGE;
    } else if (value >= 90) {
      return selected ? GOOD_SELECTED : GOOD;
    }
    return BAD;
  }

  getBarBody = (item) => {
    return (
      <React.Fragment>
        <Text style={styles.barBodyText}>
          {item.value >= 80 ? item.value : null}
        </Text>
        <Image
          source={this.getBarImage(item.value, item.selected)}
          style={styles.barImage}
        />
      </React.Fragment>
    );
  }

  getSelectedBar = (item) => {
    return (
      <LinearGradient
        colors={this.getSelectedBarColor(item.value)}
        style={[
          styles.bar,
          {
            width: item.value >= 80 ? 39 : 36,
            height: HEIGHT * this.getBarHeight(item.value),
            borderWidth: item.value >= 80 ? 3 : 0,
            borderColor: this.getBorderColor(item.value),
          }
        ]}
      >
        {this.getBarBody(item)}
      </LinearGradient>
    );
  }

  getNotSelectedBarColor = (value) => {
    if (value >= 80 && value < 90) {
      return '#52C873';
    } else if (value >= 90) {
      return '#FF823C';
    }
    return '#CFCFCF';
  }

  getTransform = (transform, height) => {
    return withAnchorPoint(transform, { x: 0.5, y: 1 }, { width: 36, height, });
  };

  getNotSelectedBar = (item) => {
    const ViewScaleValue = item.animation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    });
    const transform = {
      transform: [{ scaleY: ViewScaleValue }],
    };
    const height = HEIGHT * this.getBarHeight(item.value);
    return (
      <Animated.View
        style={[
          styles.bar,
          this.getTransform(transform, height),
          {
            height,
            backgroundColor: this.getNotSelectedBarColor(item.value),
          }
        ]}
      >
        {this.getBarBody(item)}
      </Animated.View>
    );
  }

  renderGraph = () => {
    let { data } = this.state;
    return (
      <View style={styles.graphContainer}>
        <View style={styles.graphContainerHalf}></View>
        <View style={styles.graphContainerHalf}></View>
        <View style={styles.graphContainerBottom}></View>
        <View style={styles.absoluteContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={item.text}
              onPress={() => {
                data[index].selected = !data[index].selected;
                this.setState({ data })
              }}
            >
              <View
                style={styles.barContainer}
              >
                {item.selected ? this.getSelectedBar(item) : this.getNotSelectedBar(item)}
                <View
                  style={[
                    styles.barContainerTextContainer,
                    {
                      elevation: item.selected ? 2 : 0,
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.barContainerText,
                      {
                        color: item.selected ? this.getNotSelectedBarColor(item.value) : '#2D2F33',
                      }
                    ]}>
                    {item.text}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  renderBody = () => {
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.bodyContainerTop}>
          <Image
            source={MAN}
            style={styles.back}
          />
          <Text style={styles.bodyTextTop}>
            李强
          </Text>
        </View>
        <Text style={styles.bodyTextMiddle}>
          88
        </Text>
        <Text style={styles.bodyTextBottom}>
          周平均心情指数
        </Text>
        {this.renderGraph()}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.root}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 18,
  },
  back: {
    height: 36,
    width: 36,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    color: '#2D2F33',
    marginLeft: WIDTH * 0.25,
  },
  bodyContainer: {
    height: HEIGHT - 120,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    elevation: 1.5,
    marginHorizontal: 18,
  },
  bodyContainerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  bodyTextTop: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    color: '#2D2F33',
    marginLeft: 12,
  },
  bodyTextMiddle: {
    fontSize: 72,
    fontWeight: '800',
    lineHeight: 98,
    color: '#2D2F33',
    textAlign: 'center',
  },
  bodyTextBottom: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 25,
    color: '#929292',
    textAlign: 'center',
  },
  graphContainer: {
    height: HEIGHT * 0.36,
    marginTop: 34,
  },
  graphContainerHalf: {
    height: HEIGHT * 0.16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  graphContainerBottom: {
    height: HEIGHT * 0.04,
  },
  absoluteContainer: {
    width: WIDTH - 36,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barContainer: {
    height: HEIGHT * 0.36,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 36,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  barBodyText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 27,
    color: '#FFFFFF',
    marginTop: 12,
  },
  barImage: {
    height: 30,
    width: 30,
    marginBottom: 4,
  },
  barContainerTextContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 2,
  },
  barContainerText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 25,
  },
});

export default Home;