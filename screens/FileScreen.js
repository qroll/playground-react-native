import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import Xlog from "react-native-xlog";
import rnFetchBlob from "rn-fetch-blob";
import Mailer from "react-native-mail";

const fs = rnFetchBlob.fs;

class FileScreen extends Component {
  async componentDidMount() {
    await Xlog.open();
    await Xlog.info("File", "This was logged in componentDidMount");
  }

  handleOnPress = async () => {
    await Xlog.info("File", "This was logged in handleOnPress");
    // await Xlog.close();
    let files = await fs.ls(fs.dirs.DocumentDir + "/logs");
    console.log(">>> files", files);

    let content = await fs.readFile(
      fs.dirs.DocumentDir + "/logs/com.qwissroll.playground_20190417.xlog"
    );
    console.log(">>> content", content);

    let recipients = ["quek.ruoling@gmail.com"];
    let options = {
      subject: "Playground",
      recipients: recipients,
      body: "Ayyy lmao",
      attachment: {
        path:
          fs.dirs.DocumentDir + "/logs/com.qwissroll.playground_20190417.xlog",
        type: "text",
        name: "log.xlog"
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
        <Button title="Email" onPress={this.handleOnPress} />
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
  }
});

export default FileScreen;
