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

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Fetch: { screen: FetchScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
