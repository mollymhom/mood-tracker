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
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Angry' },
  { emoji: '😴', label: 'Tired' },
  { emoji: '😎', label: 'Cool' },
];

const moodToScore = {
  Happy: 5,
  Cool: 4,
  Tired: 3,
  Sad: 2,
  Angry: 1,
};

export default function App() {
  const [date, setDate] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveMood = () => {
    if (!selectedMood || !date.trim()) return;

    const formattedDate = moment(date, 'YYYY-MM-DD', true);
    if (!formattedDate.isValid()) {
      alert('Please enter a valid date in YYYY-MM-DD format');
      return;
    }

    const newEntry = {
      date: formattedDate.format('MMM D'),
      mood: selectedMood.label,
      score: moodToScore[selectedMood.label],
    };

    setMoodData([...moodData, newEntry]);
    setSelectedMood(null);
    setDate('');
  };

  const theme = darkMode ? styles.dark : styles.light;

  return (
    <ScrollView style={[styles.container, theme.background]}>
      <View style={styles.headerSpacer} />

      <Text style={[styles.title, theme.text]}>📊 Mood Tracker</Text>

      <View style={styles.switchContainer}>
        <Text style={theme.text}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TextInput
        style={[styles.input, theme.input]}
        placeholder="Enter Date (YYYY-MM-DD)"
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

      {moodData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, theme.text]}>Mood Overview</Text>
          <LineChart
            data={{
              labels: moodData.map((item) => item.date),
              datasets: [
                {
                  data: moodData.map((item) => item.score),
                },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero
            yLabelsOffset={10}
            chartConfig={{
              backgroundColor: darkMode ? '#333' : '#fff',
              backgroundGradientFrom: darkMode ? '#333' : '#fff',
              backgroundGradientTo: darkMode ? '#222' : '#f9f9f9',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: () => darkMode ? '#fff' : '#000',
              style: {
                borderRadius: 8,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#007AFF',
              },
            }}
            bezier
            style={{
              borderRadius: 8,
              marginVertical: 10,
            }}
          />
          <Text style={[styles.scaleLabel, theme.text]}>
            1 = Angry | 2 = Sad | 3 = Tired | 4 = Cool | 5 = Happy
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  headerSpacer: {
    height: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
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
  chartContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scaleLabel: {
    fontSize: 12,
    marginTop: 5,
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
