import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function WordList() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('rel_rhy');
  const [word, setWord] = useState('');
  const [error, setError] = useState(null);

  const options = [
    { label: 'Rhymes with', value: 'rel_rhy' },
    { label: 'Sounds like', value: 'sl' },
    { label: 'Related to', value: 'ml' }
  ];

  const getWords = async () => {
    setLoading(true);
    setError(null);
    try {
      let api = `https://api.datamuse.com/words/?${selectedOption}=${word}`;

      if (selectedOption === 'ml' && word.includes(' ')) {
        const wordsArray = word.split(' ');
        const wordsWithPlus = wordsArray.join('+');
        api = `https://api.datamuse.com/words/?${selectedOption}=${wordsWithPlus}`;
      }

      const response = await fetch(api);
      const jsonWords = await response.json();
      setData(jsonWords);
    } catch (error) {
      setError('An error occurred while fetching data. Please check your network and try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWords();
  }, [selectedOption, word]);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setWord}
        value={word}
        placeholder="Enter a word"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.option}
              onPress={() => {
                setSelectedOption(option.value);
                setShowOptions(false);
              }}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {isLoading ? <ActivityIndicator size={'large'} /> : (
        <View>
          <Text style={{ color: '' }}>Tap on a word to see other words that it rhymes with, sounds like or relate to..</Text>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={data}
            keyExtractor={(item) => item.word}
            renderItem={({ item }) => (
              <View style={styles.textContainer}>
                <TouchableOpacity
                  onPress={() => setShowOptions(!showOptions)}
                >
                  <Text style={styles.text}>
                    {item.word}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  flatList: {
    backgroundColor: '#100c25',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textContainer: {
    padding: 4
  },
  text: {
    backgroundColor: '#491375',
    color: 'white',
    justifyContent: 'center',
    padding: 20,
    width: 'auto',
    borderRadius: 50,
    textAlign: 'auto'
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  option: {
    backgroundColor: '#491375',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50
  },
  optionText: {
    color: 'white'
  }
});
