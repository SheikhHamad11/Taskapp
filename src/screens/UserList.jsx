// components/UserList.js
import React from 'react';
import {View, Text, Button, FlatList, ImageBackground} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteUser} from '../Redux/UserSlice';

const UserList = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteUser(id));
  };

  const renderUserItem = ({item, index}) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: 'green',
      }}>
      <Text style={{color: 'black'}}>
        {item.name} - {item.email}
      </Text>
      <Button title="Delete" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <View
      style={{
        // flex: 1,
        marginTop: 10,
        minWidth: 200,
        minHeight: 200,
        backgroundColor: 'gray',
      }}>
      {!users.length ? (
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          No Users
        </Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderUserItem}
        />
      )}
    </View>
  );
};

export default UserList;
