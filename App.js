import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

const recipes = [
  {
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Pepper'],
    steps: ['Boil pasta', 'Fry pancetta', 'Mix eggs & cheese', 'Combine all'],
  },
  {
    title: 'Thai Green Curry',
    image: 'https://plus.unsplash.com/premium_photo-1713089366140-814130d69933?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Green curry paste', 'Coconut milk', 'Chicken', 'Basil', 'Vegetables'],
    steps: ['Cook paste', 'Add coconut milk', 'Add chicken', 'Simmer', 'Garnish with basil'],
  },
  {
    title: 'Banana Pancakes',
    image: 'https://plus.unsplash.com/premium_photo-1692193554212-6a27903ab9c4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ingredients: ['Bananas', 'Flour', 'Eggs', 'Milk', 'Maple syrup'],
    steps: ['Mash banana', 'Mix batter', 'Cook on pan', 'Serve with syrup'],
  },
];

export default function App() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState('');

  const theme = darkMode ? styles.dark : styles.light;

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>📖 Recipe Viewer</Text>

      <View style={styles.switchRow}>
        <Text style={theme.text}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TextInput
        style={[styles.input, theme.input]}
        placeholder="Search recipes..."
        placeholderTextColor={darkMode ? '#aaa' : '#999'}
        value={search}
        onChangeText={setSearch}
      />

      {filteredRecipes.map((recipe, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Text style={[styles.recipeTitle, theme.text]}>{recipe.title}</Text>
          <Button
            title={expandedIndex === index ? 'Hide Details' : 'Show Details'}
            onPress={() => toggleExpand(index)}
          />
          <Collapsible collapsed={expandedIndex !== index}>
            <Text style={[styles.subtitle, theme.text]}>Ingredients:</Text>
            {recipe.ingredients.map((item, i) => (
              <Text key={i} style={theme.text}>• {item}</Text>
            ))}
            <Text style={[styles.subtitle, theme.text]}>Steps:</Text>
            {recipe.steps.map((item, i) => (
              <Text key={i} style={theme.text}>{i + 1}. {item}</Text>
            ))}
          </Collapsible>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 10,
    fontWeight: '600',
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
