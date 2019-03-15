import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";

class FetchInfo extends Component {
  state = {
    response: null,
    error: null
  };

  componentDidMount() {
    let { url, debug } = this.props;
    fetch(this.props.url) // http or https protocol must be defined
      .then(async response => {
        console.log(`Fetch ${url} - response:`, response);
        let formattedResponse = await this.formatResponse(response, debug);
        this.setState({ response: formattedResponse });
      })
      .catch(async error => {
        console.log(`Fetch ${url} - error: `, error);
        let formattedError = await this.formatError(error, debug);
        this.setState({ error: formattedError });
      });
  }

  formatResponse = async (response, debug = false) => {
    if (debug) {
      return JSON.stringify(response, null, 4);
    }

    let body;
    let contentType = response.headers.get("content-type") || "";
    console.log("Fetch - contentType:", contentType);
    if (contentType.includes("text/html")) {
      body = await response.text();
    } else {
      body = await response.json();
      body = JSON.stringify(body, null, 4);
    }
    return body;
  };

  formatError = (error, debug = false) => {
    return JSON.stringify(
      { message: error.message, stack: error.stack },
      null,
      4
    );
  };

  render() {
    let { response, error } = this.state;
    let { debug, url } = this.props;

    return (
      <View>
        <Text style={fetchInfoStyles.url}>{url}</Text>
        {response ? (
          <Text style={fetchInfoStyles.response}>{response}</Text>
        ) : error ? (
          <Text style={fetchInfoStyles.error}>{error}</Text>
        ) : (
          <Text style={fetchInfoStyles.empty}>Waiting for response...</Text>
        )}
      </View>
    );
  }
}

class FetchScreen extends Component {
  static navigationOptions = {
    title: "Fetch"
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <FetchInfo url="http://google.com" />
          <FetchInfo url="https://pg.moe.edu.sg/api/1/debug/version" />
        </ScrollView>
      </View>
    );
  }
}

const fetchInfoStyles = StyleSheet.create({
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  content: {
    padding: 16
  }
});

export default FetchScreen;
