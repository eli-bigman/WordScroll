import { ActivityIndicator, StyleSheet, FlatList, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'


export default function WordList() {
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
    <View >
      {isLoading ? (<ActivityIndicator />) :
        (<FlatList
          contentContainerStyle={styles.flatList}
          data={data}
          keyExtractor={(item) => item.word}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {item.word}
              </Text>
            </View>

          )}
        />

        )}

    </View>
  );

}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#00fdfc',
    justifyContent: 'space-between'
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  text: {
    backgroundColor: '#491375',
    color: 'white',
    justifyContent: 'center',
    padding: 20,
    width: 120,
    borderRadius: 50,
    textAlign: "auto"
  },
});

