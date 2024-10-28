import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <ImageBackground
        source={require('../../src/assets/img.jpg')}
        style={styles.background}
        resizeMode="cover">
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('VolumePlay')}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>Audio Player</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('FlatListPage')}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>FlatList</Text>
              {/* <Text style={styles.text}>(ترجمہ کے ساتھ قرآن)</Text> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('CRUD')}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>CRUD</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('ImageUpload')}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>Image Upload</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Tabs')}>
            <View style={{marginLeft: 10}}>
              <Text style={styles.text}>Tabs</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: 'center',
  },
  text: {
    fontSize: height * 0.03,
    color: 'black',
  },
  row: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  row2: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: height * 0.01,
  },
  contentContainer: {
    padding: 20,
  },
  quranText: {
    fontSize: 28,
    color: '#004d00', // Dark green for Quranic text
    fontFamily: 'Scheherazade', // Assuming you've added this font
    textAlign: 'center',
  },
  tafseerText: {
    fontSize: height * 0.025,
    color: '#333', // Dark gray for Tafseer text
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 40,
  },
  image2: {
    width: 50,
    height: 40,
  },
  container: {
    margin: 20,
  },
  button: {
    backgroundColor: '#958145',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#DED3BF',
    borderRadius: 5,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
  },
});
