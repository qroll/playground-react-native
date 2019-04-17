import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";

import ErrorUtils from 'ErrorUtils';

const defaultErrorHandler = ErrorUtils.getGlobalHandler();
const customErrorHandler = (e, isFatal) => {
  console.log("In customErrorHandler");
  defaultErrorHandler(e, isFatal)
}
ErrorUtils.setGlobalHandler(customErrorHandler);

class Child extends Component {
  componentDidMount() {
    // await Promise.reject('componentDidMount');
    throw new Error('componentDidMount')
  }

  render() {
    return <View>
      <Text>The child rendered correctly</Text>
    </View>
  }
}

class ErrorScreen extends Component {
  // componentDidCatch(e, i) {
  //   console.log(e, i);
  // }

  render() {
    return <Child />;
  }
}

const errorStyles = StyleSheet.create({
  url: {
    fontSize: 20,
    fontWeight: "bold"
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
  empty: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default ErrorScreen;
