import { createContext, useEffect, useState } from 'react'
import { databases, client } from '../lib/appwrite'
import { ID } from 'react-native-appwrite'
import { useUser } from '../hooks/useUser'
import { Permission, Query, Role } from 'appwrite'

const DATABASE_ID = "691cc1770019416ab27d"
const TABLE_ID = "bookstyr35737"

export const BooksContext = createContext()

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const {user} = useUser()

  async function fetchBooks() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        TABLE_ID,
        [
          Query.equal('userId', user.$id) 
        ]
      )

      setBooks(response.documents)
      console.log(response.documents)

    } catch (error) {
      console.error(error.message)
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        TABLE_ID,
        id
      )

      return response
    } catch (error) {
      console.error(error.message)
    }
  }

  async function createBook(data) {
    try {
      const newBook = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        { ...data, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      )
    } catch (error) {
      console.error(error.message)
    }
  }

  async function deleteBook(id) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        TABLE_ID,
        id
      )
    } catch (error) {
      console.error(error.message)
    }
  }
/*
  //real time doesnt work
  
  useEffect(() => {
    let unsubscribe 
    const channel = `databases.${DATABASE_ID}.collections.${TABLE_ID}.documents`
    
    if (user) {
      fetchBooks()

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response

        if (events[0].includes('create')) {
          setBooks((prevBooks) => [...prevBooks, payload])
        }

        if (events[0].includes('delete')) {
          setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== payload.$id))
        }
      }) 
    } else {
      setBooks([])
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }

  }, [user])
*/

  useEffect(() => {
  if (!user) return;

  // Сразу подгружаем книги
  fetchBooks();

  // Каждые 5 секунд обновляем список
  const interval = setInterval(fetchBooks, 5000);

  // Очистка интервала при размонтировании или смене пользователя
    
  const handleDelete = (deletedBookId) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.$id !== deletedBookId))
  }

  return () => clearInterval(interval);

}, [user]);


  return (
    <BooksContext.Provider
      value={{books, fetchBooks, fetchBookById, createBook, deleteBook}}
    >
      {children}
    </BooksContext.Provider>
  )
}