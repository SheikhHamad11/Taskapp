// components/UserForm.js
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {addUser, updateUser} from '../Redux/UserSlice';

const UserForm = ({existingUser}) => {
  const [name, setName] = useState(existingUser?.name || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Validation: Check if name and email are not empty
    if (!name.trim() || !email.trim()) {
      Alert.alert('Validation Error', 'Both name and email are required.');
      return;
    }

    // If updating an existing user
    if (existingUser) {
      dispatch(updateUser({id: existingUser.id, field: 'name', value: name}));
      dispatch(updateUser({id: existingUser.id, field: 'email', value: email}));
    } else {
      // Add new user
      dispatch(addUser({name, email}));
    }

    // Clear the form after submission
    setName('');
    setEmail('');
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={'gray'}
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={'gray'}
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <Button
        title={existingUser ? 'Update User' : 'Add User'}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default UserForm;
