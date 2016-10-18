import React, { Component } from 'react';
import {
  View,
  Text,
  AppState,
  StyleSheet,
  Platform,
  TextInput,
 } from 'react-native';
import PushNotification from 'react-native-push-notification';

import PushController from './PushNotificationController';

export default class PushNotificationTest extends Component {
  constructor(props) {
    super(props);

    this.state = { seconds: 5 }

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (this.state.seconds * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "PLEASE COME BACK TO ME PLEASE!!!",
        date
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Please insert a number!</Text>
        <Text style={styles.paragraphText}>The push notification will apear in the amount of seconds you choose</Text>
        <TextInput
          style={styles.inputStyle}
          keyboardType='numeric'
          onChangeText={(num) =>{ this.setState({ seconds: parseInt(num) }); console.log(num); }}
        />
        <PushController />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1c40f'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '200',
    padding: 8
  },
  paragraphText: {
    textAlign: 'center',
    padding: 10
  },
  inputStyle: {
    margin: 15,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  }
});
