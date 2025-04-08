import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
  TouchableOpacity,
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
  const [date, setDate] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveMood = () => {
    if (!selectedMood || !moment(date, 'YYYY-MM-DD', true).isValid()) return;

    const newEntry = {
      mood: selectedMood,
      date: moment(date).startOf('day'),
    };
    setMoodData([...moodData, newEntry]);
    setSelectedMood(null);
    setDate('');
  };

  const getWeeklySummary = () => {
    const thisWeek = moment().startOf('isoWeek');
    const filtered = moodData.filter(entry =>
      moment(entry.date).isSameOrAfter(thisWeek)
    );

    const total = filtered.length;
    const counts = {};
    filtered.forEach(entry => {
      counts[entry.mood.label] = (counts[entry.mood.label] || 0) + 1;
    });

    return moodOptions.map(({ label, emoji }) => {
      const count = counts[label] || 0;
      const percent = total ? ((count / total) * 100).toFixed(0) : 0;
      return { label, emoji, percent };
    });
  };

  const getRecommendation = () => {
    const summary = getWeeklySummary();
    const most = summary.sort((a, b) => b.percent - a.percent)[0];
    if (!most || most.percent === '0') return 'Start logging your moods!';
    switch (most.label) {
      case 'Sad': return 'Consider talking to someone or taking a walk 🌿';
      case 'Angry': return 'Try calming activities like breathing or music 🎧';
      case 'Tired': return 'Make sure you are getting enough sleep 😴';
      case 'Happy': return 'Keep doing what you love! 😊';
      case 'Cool': return 'You’re chill — spread the vibes! 😎';
      default: return '';
    }
  };

  const theme = darkMode ? styles.dark : styles.light;

  return (
    <ScrollView style={[styles.container, theme.background]}>
      <View style={{ height: 60 }} />
      <Text style={[styles.title, theme.text]}>📊 Mood Tracker</Text>

      <View style={styles.switchContainer}>
        <Text style={theme.text}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TextInput
        style={[styles.input, theme.input]}
        placeholder="Enter date (YYYY-MM-DD)"
        placeholderTextColor={darkMode ? '#aaa' : '#999'}
        value={date}
        onChangeText={setDate}
      />

      <Text style={[styles.subtitle, theme.text]}>How are you feeling?</Text>

      <View style={styles.moodRow}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood.label}
            style={[
              styles.moodButton,
              selectedMood?.label === mood.label && styles.moodSelected,
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Mood" onPress={handleSaveMood} />

      <View style={styles.summaryBox}>
        <Text style={[styles.subtitle, theme.text]}>This Week's Mood Summary</Text>
        {getWeeklySummary().map((item, index) => (
          <Text key={index} style={[styles.summaryText, theme.text]}>
            {item.emoji} {item.label}: {item.percent}%
          </Text>
        ))}
      </View>

      <Text style={[styles.subtitle, theme.text]}>💡 Recommendation</Text>
      <Text style={[theme.text, { marginBottom: 40 }]}>{getRecommendation()}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  moodButton: {
    padding: 10,
  },
  moodSelected: {
    backgroundColor: '#cce5ff',
    borderRadius: 10,
  },
  moodEmoji: {
    fontSize: 28,
  },
  summaryBox: {
    marginVertical: 20,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 4,
  },
  dark: {
    background: { backgroundColor: '#121212' },
    text: { color: '#fff' },
    input: {
      borderColor: '#555',
      backgroundColor: '#222',
      color: '#fff',
    },
  },
  light: {
    background: { backgroundColor: '#fff' },
    text: { color: '#000' },
    input: {
      borderColor: '#ccc',
      backgroundColor: '#fff',
      color: '#000',
    },
  },
});
