import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Picker, Button, Text } from "native-base";
import Expo, {AppLoading} from "expo";
import SignInScreen from './Login.js';

export default class cqrityApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isReady: false
    };
    
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {    

    if (!this.state.isReady) {
      return (
        <AppLoading
          //startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }  
   return <SignInScreen />;
  
  }
}
