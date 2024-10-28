import React, {useState} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../screens/Home';

import VolumePlay from '../screens/VolumePlay';
import FlatListPage from '../screens/FlatListPage';
import CRUD from '../screens/CRUD';
import ImageUploader from '../screens/ImageUpload';
import Tabs from '../screens/Tabs';

export default function AppNavigator() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS, // Smooth transition
        }}>
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="VolumePlay" component={VolumePlay} />
        <Stack.Screen name="FlatListPage" component={FlatListPage} />
        <Stack.Screen name="CRUD" component={CRUD} />
        <Stack.Screen name="ImageUpload" component={ImageUploader} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </>
  );
}
