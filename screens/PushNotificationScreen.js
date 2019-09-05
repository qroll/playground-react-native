import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button
} from "react-native";
import firebase from "react-native-firebase";

class PushNotificationScreen extends Component {
  static navigationOptions = {
    title: "PushNotification"
  };

  state = {
    token: null,
    hasPermission: null
  };

  handleOnGetTokenPress = async () => {
    try {
      let token = await firebase.messaging().getToken();
      console.log(">>> PushNotificationScreen: token is " + token);
      this.setState({ token });
    } catch (error) {
      console.log(">>> PushNotificationScreen: error is " + error);
      this.setState({ token: error });
    }
  };

  handleOnCheckPermission = async () => {
    try {
      const hasPermission = await firebase.messaging().hasPermission();
      this.setState({ hasPermission });
    } catch (error) {
      console.log(">>> PushNotificationScreen: error is " + error);
      this.setState({ hasPermission: error });
    }
  };

  handleOnRequestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.setState({ requestPermission: "successful" });
    } catch (error) {
      console.log(">>> PushNotificationScreen: error is " + error);
      this.setState({ requestPermission: error });
    }
  };

  handleNotificationListener = async () => {
    const messageListener = firebase.notifications().onNotification(message => {
      console.log(">>> PushNotificationScreen: received message", message);

      this.setState({
        message: message.data
      });

      const notification = new firebase.notifications.Notification()
        .setNotificationId(message.notificationId)
        .setTitle("Ooh " + message.title)
        .setBody("Ooh " + message.body);

      notification.android
        .setChannelId("test-channel")
        .android.setSmallIcon("ic_launcher");

      firebase.notifications().displayNotification(notification);
    });
    this.setState({ messageListener });
  };

  handleNotificationListenerRemove = async () => {
    this.state.messageListener();
    this.setState({ messageListener: null });
  };

  handleTokenRefreshListener = async () => {
    const tokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
      console.log(">>> PushNotificationScreen: received new token", token);

      this.setState({
        token: token
      });
    });
    this.setState({ tokenRefreshListener });
  };

  handleTokenRefreshListenerRemove = async () => {
    this.state.tokenRefreshListener();
    this.setState({ tokenRefreshListener: null });
  };

  handleOnChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      "test-channel",
      "Test Channel",
      firebase.notifications.Android.Importance.Max
    ).setDescription("Test Push Notifications");

    firebase.notifications().android.createChannel(channel);

    this.setState({ createdChannel: true });
  };

  initializePN = async () => {
    await firebase.messaging().requestPermission();
    const token = await firebase.messaging().getToken();
    this.setState({ token });

    console.log(">>> initializePN: token is " + token);

    fetch("http://httpbin.org/delay/5", { method: "POST" })
      .then(response => response.json())
      .then(body => console.log(">>> initializePN: registered token"));

    const messageListener = firebase.notifications().onNotification(message => {
      console.log(">>> initializePN: received message", message);

      this.setState({
        message: message.data
      });

      const notification = new firebase.notifications.Notification()
        .setNotificationId(message.notificationId)
        .setTitle("Ooh " + message.title)
        .setBody("Ooh " + message.body);

      notification.android
        .setChannelId("test-channel")
        .android.setSmallIcon("ic_launcher");

      firebase.notifications().displayNotification(notification);
    });

    const tokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
      console.log(">>> initializePN: received new token", token);

      this.setState({
        token: token
      });
    });

    this.setState({ messageListener, tokenRefreshListener });
  };

  render() {
    let {
      token,
      hasPermission,
      requestPermission,
      messageListener,
      tokenRefreshListener,
      message,
      createdChannel
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <View>
            <Text style={styles.header}>Received</Text>
            <Text style={styles.code}>{JSON.stringify(message, null, 4)}</Text>
          </View> */}
          <Button title="Run code of doom" onPress={this.initializePN} />
          <View>
            <Text style={styles.code}>
              {JSON.stringify(hasPermission, null, 4)}
            </Text>
          </View>
          <Button
            title="Check permission"
            onPress={this.handleOnCheckPermission}
          />
          <View>
            <Text style={styles.code}>
              {JSON.stringify(requestPermission, null, 4)}
            </Text>
          </View>
          <Button
            title="Request permission"
            onPress={this.handleOnRequestPermission}
          />
          <View>
            <Text style={styles.code}>
              {JSON.stringify(createdChannel, null, 4)}
            </Text>
          </View>
          <Button title="Create Channel" onPress={this.handleOnChannel} />
          <View>
            <Text style={styles.code}>{JSON.stringify(token, null, 4)}</Text>
          </View>
          <Button title="Get token" onPress={this.handleOnGetTokenPress} />
          <View>
            <Text style={styles.code}>
              {JSON.stringify(!!messageListener, null, 4)}
              {/* {messageListener && messageListener.toString()} */}
            </Text>
          </View>
          <Button
            title="Add onNotification listener"
            onPress={this.handleNotificationListener}
          />
          <Button
            title="Remove onNotification listener"
            onPress={this.handleNotificationListenerRemove}
          />
          <View>
            <Text style={styles.code}>
              {JSON.stringify(!!tokenRefreshListener, null, 4)}
              {/* {tokenRefreshListener && tokenRefreshListener.toString()} */}
            </Text>
          </View>
          <Button
            title="Add onTokenRefresh listener"
            onPress={this.handleTokenRefreshListener}
          />
          <Button
            title="Remove onTokenRefresh listener"
            onPress={this.handleTokenRefreshListenerRemove}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  content: {
    padding: 16
  },
  code: {
    fontSize: 12,
    margin: 10,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace"
  }
});

export default PushNotificationScreen;
