// App.js
// import React from 'react';
// import {Provider} from 'react-redux';
// import {store} from './store';
// import UserList from './UserList';
// import UserForm from './UserForm';
// import {View, Text, ScrollView, ImageBackground} from 'react-native';

// const CRUD = () => {
//   //   <ImageBackground
//   //     source={require('../../src/assets/img.jpg')}
//   //     style={{flex: 1}}
//   //     resizeMode="cover">
//   <ScrollView contentContainerStyle={{padding: 20}}>
//     <Text style={{fontSize: 24, marginBottom: 20, color: 'black'}}>
//       User Management
//     </Text>

//     <UserForm />

//     <UserList />
//   </ScrollView>;
//   //   </ImageBackground>;
// };

// export default CRUD;

import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

export default function CRUD() {
  return (
    <ImageBackground
      source={require('../../src/assets/img.jpg')}
      style={{flex: 1, padding: 20}}
      resizeMode="cover">
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
        }}>
        User Management
      </Text>

      <UserForm />

      <UserList />
    </ImageBackground>
  );
}
