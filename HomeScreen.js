import React, { Component } from 'react';
import {
  StatusBar,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
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
import {
  DrawerNavigator,
  StackNavigator,
  SwitchNavigator,
  NavigationActions,
} from 'react-navigation'; // Version can be specified in package.json
import { BarCodeScanner, Permissions, Google, Location, MapView } from 'expo';
import * as firebase from 'firebase'; // Version can be specified in package.json

var firebaseConfig = {
  apiKey: 'AIzaSyBLhIpYnOdNDRbuUT-ZHIEXJEyPr92ktzc',
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

class HomeScreen extends React.Component {
  /*  static navigationOptions = {
    header: null,
    title: 'cQRity',
  };
  state = {
    hasCameraPermission: null,
    locationResult: null,
    inputValue: null,
    puntoControl: null,
    locationBasic: null,
    user: firebase.auth().currentUser.uid,
  };
  componentDidMount() {
    this._requestCameraPermission();
    this.scanSuccess = false;
    this._getLocationAsync();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({ type, data }) => {
    if (this.scanSuccess) return;
    this.scanSuccess = true;
    this.setState({ puntoControl: JSON.parse(data) });
    Alert.alert('Código escaneado', JSON.stringify(data));
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    this.setState({ locationBasic: location });
  };

  _resetForm() {
    this.scanSuccess = false;
    //this.setState({scanSuccess: false})
    this.setState({ inputValue: null });
    this.setState({ puntoControl: null });
    console.log(
      'scanSuccess:' +
        this.state.scanSuccess +
        ' inputValue: ' +
        this.state.inputValue +
        ' puntoControl: ' +
        this.state.puntoControl
    );
  }

  _handlerTextInput = () => {
    var reporte = this.state.inputValue;

    if (this.state.puntoControl === null) {
      Alert.alert('Falta escanear el código');
    } else {
      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('registros').push().key;

      var datos = {};
      datos[
        '/datos/' + this.state.user + '/' + newPostKey + '/puntoControl'
      ] = this.state.puntoControl;
      datos[
        '/datos/' + this.state.user + '/' + newPostKey + '/reporte'
      ] = reporte;
      datos[
        '/datos/' + this.state.user + '/' + newPostKey + '/ubicacion'
      ] = this.state.locationBasic;
      console.log('Datos: ' + datos);
      firebase.database().ref().update(datos);

      Alert.alert('¡Bien!', 'Registro guardado');

      this._resetForm();
    }
  };

  render() {
    return (
      <Container>
        <Header style={{ marginTop: 20 }}>
          <Left />
          <Body>
            <Title>Captura</Title>
          </Body>
          <Right>
            <Button onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Content padder>
            <Card>
              <CardItem>
                <Body>
                  <Text center>Coloca el código QR dentro del recuadro</Text>
                  {this.state.hasCameraPermission === null
                    ? <Text>Requesting for camera permission</Text>
                    : this.state.hasCameraPermission === false
                        ? <Text>Camera permission is not granted</Text>
                        : <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{ height: 200, width: '100%' }}
                          />}

                </Body>
              </CardItem>
              <CardItem>
                <Content padder>
                  <Form>
                    <Text>Regístra tu reporte</Text>
                    <Textarea
                      rowSpan={5}
                      bordered
                      placeholder="Escribe tu reporte"
                      returnKeyLabel="done"
                      onChangeText={inputValue => this.setState({ inputValue })}
                      value={this.state.inputValue}
                    />
                    <Button
                      full
                      rounded
                      style={{ marginTop: 10 }}
                      onPress={() => this._handlerTextInput()}>
                      <Text>Guardar reporte</Text>
                    </Button>
                  </Form>
                </Content>
              </CardItem>
            </Card>
          </Content>
        </KeyboardAvoidingView>
      </Container>
    );
  }
  */
  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

/******** drawer *********/
const RootDrawer = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: <Text>Captura</Text>,
      },
    },
  },
  {
    drawerPosition: 'right',
    drawerWidth: 200,
  }
);

export default RootDrawer;
