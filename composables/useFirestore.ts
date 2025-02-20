import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
  query,
  where
} from 'firebase/firestore'

export const useFirestore = () => {
  const { $firestoreDb } = useNuxtApp()

  const add = async (col: string, data: Object) => {
    const colRef = collection($firestoreDb, col)
    const docRef = await addDoc(colRef, data)
    return docRef
  }
  // set replaces the entire document with current data: Object
  const addUser = async (col: string, userId: string, data: Object) => {
    const colRef = doc($firestoreDb, col, userId)
    await setDoc(colRef, data)
    return colRef
  }

  const addSubcollection = async (
    col: string,
    userId: string,
    subcol: string,
    itemUID: string,
    data: Object
  ) => {
    const colRef = doc($firestoreDb, col, userId, subcol, itemUID)
    await setDoc(colRef, data)
    return colRef
  }
  // update adds a new field to an existing document
  // use { merge: true } option to ensure new data is merged with existing data
  const update = async (col: string, userId: string, data: Object) => {
    const docRef = doc($firestoreDb, col, userId)
    return await updateDoc(docRef, data)
  }

  const updateSubcollection = async (
    col: string,
    userId: string,
    subcol: string,
    itemUID: string,
    data: Object
  ) => {
    const colRef = doc($firestoreDb, col, userId, subcol, itemUID)
    await updateDoc(colRef, data)
    return colRef
  }

  const read = async (col: string) => {
    const colRef = collection($firestoreDb, col)
    const snapshot = await getDocs(colRef)
    const docs = Array.from(snapshot.docs).map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      }
    })
    return docs
  }

  const readById = async (col: string, email: string) => {
    try {
      const colRef = collection($firestoreDb, col)
      const q = query(colRef, where('email', '==', email))
      const snapshot = await getDocs(q)
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      return docs
    } catch (error) {
      console.error('Error reading documents:', error)
      return []
    }
  }

  const del = async (col: string, id: string) => {
    const docRef = doc($firestoreDb, col, id)
    return await deleteDoc(docRef)
  }

  return {
    add,
    addUser,
    addSubcollection,
    updateSubcollection,
    read,
    readById,
    update,
    del
  }
}
