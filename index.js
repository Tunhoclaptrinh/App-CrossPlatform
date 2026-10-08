import { AppRegistry } from 'react-native';
import { enableScreens, enableFreeze } from 'react-native-screens';
import App from './App';
import { name as appName } from './app.json';

// Enable native navigation fragments and screen freeze for 0-lag stack navigation
enableScreens(true);
enableFreeze(true);

AppRegistry.registerComponent(appName, () => App);

