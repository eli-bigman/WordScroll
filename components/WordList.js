import { ActivityIndicator, SafeAreaView, FlatList, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'


function WordList() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const api = 'https://api.datamuse.com/words/?rel_rhy=dog';

  getWords = async () => {
    try {
      const response = await fetch(api);
      const jsonWords = await response.json();
      setData(jsonWords);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWords();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (<ActivityIndicator />) :
        (<FlatList
          data={data}
          keyExtractor={(item) => item.word}
          renderItem={({ item }) => (
            <Text>
              {item.word}
            </Text>
          )}
        />

        )}

    </View>
  );

};

export default WordList