import { StyleSheet, Text, View } from 'react-native';
import WordList from './components/WordList';

export default function App() {
  return (
    <View style={styles.container}>
      <WordList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});
