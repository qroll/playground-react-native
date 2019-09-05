import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import NotificationManager from "../utils/NotificationManager";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };

  componentDidMount() {
    NotificationManager.init();
    NotificationManager.initializeNewSession(() => {
      console.log(">>> callback was called wooo woo");
    }, "PARENTID");
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={headerStyles.header}>
          <Text style={headerStyles.welcome}>Playground</Text>
          <Text style={headerStyles.instructions}>
            To get started, edit App.js
          </Text>
        </View>
        <View style={bodyStyles.body}>
          <Button
            style={bodyStyles.button}
            title="Fetch"
            onPress={() => navigate("Fetch")}
          />
          <Button
            style={bodyStyles.button}
            title="Secure KeyStore"
            onPress={() => navigate("Keystore")}
          />
          <Button
            style={bodyStyles.button}
            title="Error Boundaries"
            onPress={() => navigate("Error")}
          />
          <Button
            style={bodyStyles.button}
            title="File Attachment"
            onPress={() => navigate("File")}
          />
          <Button
            style={bodyStyles.button}
            title="Push Notifications"
            onPress={() => navigate("PushNotification")}
          />
          <Button
            style={bodyStyles.button}
            title="Subscribe Push Notifications"
            onPress={() =>
              NotificationManager.initializeNewSession(() => {
                console.log(">>> callback was called from subscribe!");
              }, "PARENTID")
            }
          />
          <Button
            style={bodyStyles.button}
            title="Unsubscribe Push Notifications"
            onPress={() => {
              NotificationManager.unintializeSession();
              NotificationManager.getPushPermission();
            }}
          />
        </View>
      </View>
    );
  }
}

const headerStyles = StyleSheet.create({
  header: {
    flex: 0,
    flexGrow: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const bodyStyles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    padding: 16
  },
  button: {
    width: "100%"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    width: "100%"
  }
});

export default HomeScreen;
