import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getRemoteConfig } from 'firebase/remote-config'
import { getStorage } from 'firebase/storage'
import remoteConfigFile from '../public/json/remote_config_defaults.json'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  console.log('config key', config.public.apiKey)

  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    databaseURL: config.public.databaseURL,
    projectId: config.public.projectId,
    storageBucket: config.public.storageBucket,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId
  }

  const app = initializeApp(firebaseConfig)
  const firestoreDb = getFirestore(app)
  const remoteConfig = getRemoteConfig(app)
  const storage = getStorage(app)

  remoteConfig.settings.minimumFetchIntervalMillis = 3600000

  const secretAdminKey = remoteConfigFile.admin_secret_key
  console.log('Secret Admin Key:', secretAdminKey)

  const auth = getAuth(app)

  return {
    firestoreDb,
    storage,
    provide: {
      auth,
      firestoreDb,
      storage,
      secretAdminKey
    }
  }
})
