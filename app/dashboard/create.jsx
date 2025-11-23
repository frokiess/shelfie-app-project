import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useBooks } from "../../hooks/useBooks"
import { useRouter } from 'expo-router'
import { useState } from 'react' 

//themed components
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';
import ThemedTextInput from "../../components/ThemedTextInput"
import ThemedButton from '../../components/ThemedButton'

const Create = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const { createBook } = useBooks()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) return
    
    setLoading(true)

    await createBook({ title, author, description })
    
    //reset fields
    setTitle("")
    setAuthor("")
    setDescription("")

    // redirect
    router.replace('/dashboard/books')

    //reset loading state
    setLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        
        <ThemedText title={true} style={styles.heading}>
          Add a New Book
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Book Title"
          value={title}
          onChangeText={setTitle}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <Spacer />

        <ThemedTextInput
          style={styles.multiline}
          placeholder="Book Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: '#fff' }}>
            {loading ? "Saving..." : "Create Book"}
          </Text>
        </ThemedButton>

      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
<<<<<<< HEAD
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: '#333',
=======
    paddingTop: 50,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
>>>>>>> conflict-branch
  },
  input: {
    padding: 15,
    borderRadius: 8,
    alignSelf: 'stretch',
<<<<<<< HEAD
    marginHorizontal: 40,
    backgroundColor: '#fff',
=======
    marginHorizontal: 30,
    borderWidth: 1,
>>>>>>> conflict-branch
  },
  multiline: {
    padding: 15,
    borderRadius: 8,
    minHeight: 120,
    alignSelf: 'stretch',
<<<<<<< HEAD
    marginHorizontal: 40,
    backgroundColor: '#fff',
=======
    marginHorizontal: 30,
    borderWidth: 1,
>>>>>>> conflict-branch
  }
})