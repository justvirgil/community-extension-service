import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useFirestorage = () => {
  const { $storage } = useNuxtApp()
  const { generateUUID } = useTools()

  const uploadAvatar = async (userId, file) => {
    const storageRef = ref($storage, `avatars/${userId}.jpg`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  }

  const uploadFiles = async (userId, activityId, file) => {
    try {
    const storageRef = ref($storage, `submittedFiles/${activityId}/${userId}/${generateUUID()}`)
    await uploadBytes(storageRef, file)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    uploadAvatar,
    uploadFiles
  }
}
