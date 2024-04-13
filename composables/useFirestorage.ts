import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const useFirestorage = () => {
  const { $storage } = useNuxtApp()

  const uploadAvatar = async (userId, file) => {
    const storageRef = ref($storage, `avatars/${userId}.jpg`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  }

  return {
    uploadAvatar
  }
}
