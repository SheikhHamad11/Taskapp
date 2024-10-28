import {
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import React, {useEffect, useState} from 'react';
// import CustomHeader from '../components/CustomHeader';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {surah} from '../components/SurahList';
export default function VolumePlay() {
  // const {item, url} = route.params;

  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setupPlayer();
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const setupPlayer = async () => {
    try {
      const isServiceRunning = await TrackPlayer.isServiceRunning();

      if (!isServiceRunning) {
        // Initialize the player only if it's not running
        await TrackPlayer.setupPlayer();
        console.log('TrackPlayer setup completed');
      } else {
        console.log('TrackPlayer service is already running');
      }

      const tracks = surah.map((item, index) => ({
        id: item.id.toString(), // Ensure ID is a string
        url: item.url, // The audio URL from your API
        title: item.title || `Track ${index + 1}`, // Use a title from the API or default
        artist: item.artist || 'Unknown Artist', // Use artist from the API or a default value
        artwork: item.image || require('../assets/quran.jpg'), // Use artwork from API or fallback image
      }));

      // const tracks = [url];
      // Now that the player is confirmed to be running, add the track and update options
      await TrackPlayer.add(tracks);

      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      console.log('TrackPlayer options updated');
    } catch (error) {
      console.error('Error setting up TrackPlayer:', error);
    }
  };
  const handleRemotePlay = async () => {
    await TrackPlayer.play();
    setIsPlaying(true); // Set UI to show "Playing"
  };

  const handleRemotePause = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false); // Set UI to show "Paused"
  };

  const togglePlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      const playbackState = await TrackPlayer.getState();
      console.log('Playback State:', playbackState); // Debugging log to check current state
      if (playbackState === State.Playing) {
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else {
        await TrackPlayer.play();
        setIsPlaying(true);
      }
    }
  };

  // Function to go to the next track
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    console.log('Skipped to next track');
  };

  // Function to go to the previous track
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    console.log('Skipped to previous track');
  };

  const stopPlayback = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.stop(); // Stops the audio playback
      setIsPlaying(false); // Update the UI to reflect that playback is stopped
      console.log('Playback stopped');
    }
  };

  useEffect(() => {
    setupPlayer();

    // Event listeners for remote control events
    const remotePlayListener = TrackPlayer.addEventListener(
      Event.RemotePlay,
      handleRemotePlay,
    );
    const remotePauseListener = TrackPlayer.addEventListener(
      Event.RemotePause,
      handleRemotePause,
    );

    // Cleanup on unmount
    return () => {
      remotePlayListener.remove();
      remotePauseListener.remove();
      TrackPlayer.reset();
    };

    // Clean up listener on unmount
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <>
      {/* <CustomHeader text={'Audio Player'} /> */}
      <ImageBackground
        source={require('../assets/img.jpg')}
        style={{flex: 1, padding: 20}}
        resizeMode="cover">
        <TouchableOpacity onPress={togglePlayback} style={styles.row}>
          <Icon name={isPlaying ? 'pause' : 'play'} color="black" size={20} />
          <Text style={styles.text}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={stopPlayback} style={styles.row}>
          <Icon name="stop" color="black" size={20} />
          <Text style={styles.text}>Stop </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToPrevious} style={styles.row}>
          <Icon name="less-than" color="black" size={20} />
          <Text style={styles.text}>Previous </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext} style={styles.row}>
          <Icon name="greater-than" color="black" size={20} />
          <Text style={styles.text}>Next </Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    color: 'black',
    fontSize: 18,
  },
});
