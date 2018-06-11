import React from 'react';
import {
  StatusBar,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Text,
  Textarea,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Spinner,
  Form,
} from 'native-base';
import { StackNavigator,SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import { BarCodeScanner, Permissions, Google, Location } from 'expo';
import HomeScreen from './HomeScreen1.js';
import * as firebase from 'firebase'; // Version can be specified in package.json

var firebaseConfig = {
  apiKey: '',
  authDomain: 'cqrity-1.firebaseapp.com',
  databaseURL: 'https://cqrity-1.firebaseio.com',
  projectId: 'cqrity-1',
  storageBucket: '',
  messagingSenderId: '277713640903',
};

// Ensure that you do not login twice.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class SignInScreen extends React.Component {
  
  static navigationOptions = {
    header: null,
    title: 'cQRity',
  };
  
  render() {
    console.log('SignInScreen')
    return (
      <Container>
        <Header>
          <Body>
            <Title>Registro</Title>
          </Body>
        </Header>
        <Content padder>
          <Button onPress={this._signInAsync}>
            <Text>Registrarme</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _signInAsync = async () => {
    try {
      const { type, user, idToken, accessToken } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '277713640903-2i4umgor4fd39cmtuu192fo3hmb1dfrr.apps.googleusercontent.com',
        iosClientId: '',
        scopes: ['profile', 'email'],
      });

      switch (type) {
        case 'success': {
          //Alert.alert('Logged in!', `Hi ${user.name}!`);
          console.log(user);
          console.log(type);
          console.log(idToken);
          console.log(accessToken);

          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => this.props.navigation.navigate('App'))
            .catch(error => {
              // Handle Errors here.
              console.log('Error al validar con Google');
              console.log(error);
              console.log(error.message);
            });

          break;
        }
        case 'cancel': {
          Alert.alert('Cancelado!', '¡Inicio de sesión cancelado!');
          break;
        }
        default: {
          Alert.alert('¡Ups!', '¡Falló el inicio de sesión!');
        }
      }
    } catch (e) {
      Alert.alert('¡Ups!', '¡Falló el inicio de sesión!');
    }
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>loading...</Text>
          <Spinner color="blue" />
        </Content>
      </Container>
    );
  }
}
/*
const RootStack = StackNavigator(
  {
    Home:HomeScreen,
    Auth: SignInScreen
  },{
    initialRouteName: 'Home',
    headerMode: 'none'
  });
*/

const AppStack = StackNavigator({ Home: HomeScreen });
const AuthStack = StackNavigator({ Login: SignInScreen });
//const RootStack = StackNavigator(
export default SwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
  },
);

/*
export default class MainApp extends React.Component {
  render() {
    return <RootStack />;
  }
}
*/
