import React, {Component} from 'react';
import { useAsync } from "react-async";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import firstpage from './First';
import temppage from './Temp';
import humipage from './Humi';
import solarpage from './Solar';
import gradipage from './Gradi';

const App = createStackNavigator(

    {
        Home: {screen:firstpage},
        Temp: {screen:temppage},
        Humi: {screen:humipage},
        Solar: {screen:solarpage},
        Gradi: {screen:gradipage}
    },
    {initialRouteName: 'Home', headerMode: 'none'}
);

export default createAppContainer(App);