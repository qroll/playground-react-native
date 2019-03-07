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
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

formatResponse = response => {
  return JSON.stringify(response, null, 4);
};

formatError = (error, debug = false) => {
  return JSON.stringify(
    { message: error.message, stack: error.stack },
    null,
    4
  );
};

class KeystoreScreen extends Component {
  static navigationOptions = {
    title: "KeyStore"
  };

  state = {
    key: "",
    value: "",
    error: null,
    setResult: null,
    getResult: null
  };

  handleOnKeyChange = key => {
    this.setState({ key });
  };

  handleOnChange = value => {
    this.setState({ value });
  };

  handleOnPress = async () => {
    let key = this.state.key;
    let value = this.state.value;
    try {
      let setResult = await RNSecureKeyStore.set(key, value, {
        accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
      });
      this.setState({ setResult });
      let getResult = await RNSecureKeyStore.get(key);
      this.setState({ getResult });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    let { setResult, error, key, value, getResult } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.input}
            value={key}
            onChangeText={this.handleOnKeyChange}
          />
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={this.handleOnChange}
          />
          <Button title="BOOM" onPress={this.handleOnPress} />
          {setResult ? (
            <Text style={styles.response}>{formatResponse(setResult)}</Text>
          ) : null}
          {getResult ? (
            <Text style={styles.response}>{formatResponse(getResult)}</Text>
          ) : null}
          {error ? (
            <Text style={styles.error}>{formatError(error)}</Text>
          ) : null}
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
  response: {
    fontSize: 12,
    margin: 10,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace"
  },
  error: {
    fontSize: 12,
    margin: 10,
    color: "tomato",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace"
  },
  input: {
    backgroundColor: "#eee"
  }
});

export default KeystoreScreen;
