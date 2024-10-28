import React, {useState} from 'react';
import {View, Button, Image, Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState(null);

  const checkPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE); // Use PERMISSIONS.IOS.PHOTO_LIBRARY for iOS
    if (result === RESULTS.GRANTED) {
      selectImage();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE); // Use PERMISSIONS.IOS.PHOTO_LIBRARY for iOS
    if (result === RESULTS.GRANTED) {
      selectImage();
    } else {
      Alert.alert(
        'Permission Denied',
        'You need to enable photo library access to select an image.',
      );
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
        uploadImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async asset => {
    const formData = new FormData();
    formData.append('file', {
      uri: asset.uri,
      type: asset.type, // e.g. 'image/jpeg'
      name: asset.fileName || 'photo.jpg',
    });

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const responseData = await response.json();
      Alert.alert('Success', 'Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Upload failed', error.message);
    }
  };

  return (
    <View>
      <Button title="Select Image" onPress={checkPermission} />
      {imageUri && (
        <Image source={{uri: imageUri}} style={{width: 100, height: 100}} />
      )}
    </View>
  );
};

export default ImageUploader;
