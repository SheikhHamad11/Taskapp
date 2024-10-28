import {View, Text, ScrollView, Button} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function Tabs() {
  const [showTabs, setShowTabs] = useState(false);

  return (
    <ScrollView style={{flex: 1}}>
      {showTabs ? (
        <TabNavigator />
      ) : (
        <InitialView onShowTabs={() => setShowTabs(true)} />
      )}
    </ScrollView>
  );
}

const InitialView = ({onShowTabs}) => {
  return (
    <View style={{padding: 20}}>
      <Text style={{color: 'black'}}>This is the initial content.</Text>
      <Button title="Show Tabs" onPress={onShowTabs} />
    </View>
  );
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tab1" component={Tab1Screen} />
      <Tab.Screen name="Tab2" component={Tab2Screen} />
    </Tab.Navigator>
  );
};

const Tab1Screen = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Text style={{color: 'black'}}>Tab 1 Content</Text>
  </View>
);

const Tab2Screen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text style={{color: 'black'}}>Tab 2 Content</Text>
  </View>
);
