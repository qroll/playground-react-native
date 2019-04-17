/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./screens/HomeScreen";
import FetchScreen from "./screens/FetchScreen";
import KeystoreScreen from "./screens/KeystoreScreen";
import ErrorScreen from "./screens/ErrorScreen";
import FileScreen from "./screens/FileScreen";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Fetch: { screen: FetchScreen },
  Keystore: { screen: KeystoreScreen },
  Error: { screen: ErrorScreen },
  File: { screen: FileScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
