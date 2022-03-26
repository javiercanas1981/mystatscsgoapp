/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useEffect} from 'react';

import {StatusBar, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {Actions, Scene, Router} from 'react-native-router-flux';

/****** Redux ******/
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './redux/reducers';
const reducer = combineReducers(reducers);
// eslint-disable-next-line no-unused-vars
const store = createStore(reducer, applyMiddleware(thunk));

import * as webservices from './webservices/webservices';
import {Colors} from './commons';

import ChooseUsersProfileList from  './sections/stats/ChooseUsersProfileList';

import StatsView from './sections/stats/csgo/StatsView';
import SplashScreen from 'react-native-splash-screen';

class App extends Component {

  componentWillMount() {

    SplashScreen.hide();

    webservices.configureAxios();
    StatusBar.setBarStyle('light-content'); // iOS StatusBar light style
  }

  renderRightButton() {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          Actions.CharacterNew();
        }}>
        <Image style={styles.button} source={require('./resources/layout.png')} />
      </TouchableOpacity>
    );
  }


  render() {

    const HomeIcon = () => {
      return (
          <View style={{ marginRight: 10 }} >
            <Image
                source={{ uri: `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/62/62b78fcbedc46c8502a5f2eb6c2b19c0c7a72072.jpg` }}
                style={{ width: 22, height: 25 }}
                tintColor={'red'}
            />
          </View>
      );
    };

    return (
      <Provider store={store}>
        <Router>

            <Scene key="root">

              <Scene
                  icon={HomeIcon}
                  key={'ChooseUsersProfileList'}
                  component={ChooseUsersProfileList}
                  title="CS GO Stats "
                  navigationBarStyle={styles.navBar}
                  navBarButtonColor={'white'}
              />
              <Scene
                  key={'StatsView'}
                  component={StatsView}
                  navigationBarStyle={styles.navBar}
                  navBarButtonColor={'white'}
              />



            </Scene>


        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.navBar,
  },
  buttonContainer: {
    paddingRight: 10,
  },
  button: {
    height: 24,
    width: 24,
  },
});

export default App;
