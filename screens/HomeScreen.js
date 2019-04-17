import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };

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
