import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import rnFetchBlob from "rn-fetch-blob";
import Mailer from "react-native-mail";
import firebase from "react-native-firebase";

const fs = rnFetchBlob.fs;

class FileScreen extends Component {
  state = {
    actions: [],
    counter: 0
  };

  open = async () => {
    this.setState(prevState => {
      let count = prevState.counter + 1;
      // init log file here

      return {
        counter: count,
        actions: prevState.actions.concat("open " + count)
      };
    });
  };

  close = async () => {
    this.setState(prevState => {
      let count = prevState.counter + 1;
      // close log stream here

      return {
        counter: count,
        actions: prevState.actions.concat("close " + count)
      };
    });
  };

  log = async () => {
    this.setState(prevState => {
      let count = prevState.counter + 1;
      // log to file here

      return {
        counter: count,
        actions: prevState.actions.concat("log " + count)
      };
    });
  };

  forceCrash = () => {
    this.setState(prevState => {
      let count = prevState.counter + 1;
      return {
        counter: count,
        actions: prevState.actions.concat("crash " + count)
      };
    });
    firebase.crashlytics().crash();
  };

  handleOnPress = async () => {
    let files = await fs.ls(fs.dirs.DocumentDir + "/logs");
    console.log(">>> files", files);

    // let content = await fs.readFile(
    //   fs.dirs.DocumentDir + "/logs/com.qwissroll.playground_20190417.log"
    // );
    // console.log(">>> content", content);

    let recipients = ["quek.ruoling@gmail.com"];
    let options = {
      subject: "Playground",
      recipients: recipients,
      body: "Ayyy lmao",
      attachment: {
        path:
          fs.dirs.DocumentDir + "/logs/com.qwissroll.playground_20190417.log",
        type: "text",
        name: "debug.log"
      }
    };

    return Mailer.mail(options, (err, event) => {
      if (err) {
        console.log(">>> error sending mail intent", err);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actions}>
          {this.state.actions.map((action, index) => (
            <View key={index}>
              <Text>{action}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttons}>
          <Button style={styles.button} title="Open" onPress={this.open} />
          <Button style={styles.button} title="Close" onPress={this.close} />
          <Button style={styles.button} title="Log" onPress={this.log} />
          <Button
            style={styles.button}
            title="Crash"
            onPress={this.forceCrash}
          />
          <Button
            style={styles.button}
            title="Email"
            onPress={this.handleOnPress}
          />
        </View>
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
  actions: {
    flex: 2
  },
  buttons: {
    flex: 0,
    flexDirection: "row",
    paddingBottom: 48
  },
  button: {
    margin: 16
  }
});

export default FileScreen;
