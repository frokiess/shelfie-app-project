import { StyleSheet, FlatList, Pressable } from 'react-native'
import { useBooks } from '../../hooks/useBooks'
import { Colors} from '../../constants/Colors'

import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';
import ThemedCard from '../../components/ThemedCard';
import { useRouter } from 'expo-router';

// /books/12345

const Books = () => {
  const { books } = useBooks()
  const router = useRouter()

  return (
    <ThemedView style={styles.container} safe={true}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer />
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          
          <Pressable onPress={() => router.push(`/dashboard/books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.title}> Written by {item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />

    </ThemedView>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40,
    paddingBottom: 20,
  },
  card:{
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})