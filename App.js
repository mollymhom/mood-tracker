import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
} from 'react-native';
import moment from 'moment';

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😎', label: 'Cool' },
];

export default function App() {
  const [name, setName] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addMood = () => {
    if (!selectedMood) return;
    const entry = {
      mood: selectedMood,
      time: moment().format('MMMM Do, h:mm a'),
      user: name || 'Anonymous',
    };
    setMoodHistory([entry, ...moodHistory]);
    setSelectedMood(null);
  };

  const styles = createStyles(darkMode);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌤 Mood Tracker</Text>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
        />
      </View>

      <Text style={styles.label}>How are you feeling today?</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodRow}>
        {moodOptions.map((mood, index) => (
          <View key={index} style={styles.moodItem}>
            <Text
              style={[
                styles.moodEmoji,
                selectedMood?.label === mood.label && styles.selectedMood,
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              {mood.emoji}
            </Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </View>
        ))}
      </ScrollView>

      <Button title="Save Mood" onPress={addMood} />

      <Text style={styles.historyTitle}>Mood History</Text>
      {moodHistory.map((entry, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.historyText}>
            {entry.user} felt {entry.mood.label} {entry.mood.emoji} at {entry.time}
          </Text>
        </View>
      ))}

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1684/1684375.png',
        }}
        style={styles.footerImage}
      />
    </ScrollView>
  );
}

const createStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: darkMode ? '#1e1e1e' : '#f8f8f8',
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: darkMode ? '#fff' : '#333',
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    label: {
      fontSize: 16,
      color: darkMode ? '#ddd' : '#333',
    },
    inputGroup: {
      marginVertical: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: darkMode ? '#555' : '#ccc',
      backgroundColor: darkMode ? '#2b2b2b' : '#fff',
      color: darkMode ? '#fff' : '#000',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
    },
    moodRow: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    moodItem: {
      alignItems: 'center',
      marginHorizontal: 10,
    },
    moodEmoji: {
      fontSize: 36,
      padding: 10,
      borderRadius: 10,
    },
    selectedMood: {
      backgroundColor: '#7c83fd',
    },
    moodLabel: {
      color: darkMode ? '#ddd' : '#555',
      fontSize: 14,
      marginTop: 5,
    },
    historyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 30,
      marginBottom: 10,
      color: darkMode ? '#fff' : '#333',
    },
    historyItem: {
      marginBottom: 8,
    },
    historyText: {
      color: darkMode ? '#ccc' : '#333',
    },
    footerImage: {
      width: 80,
      height: 80,
      alignSelf: 'center',
      marginTop: 30,
      opacity: 0.7,
    },
  });
