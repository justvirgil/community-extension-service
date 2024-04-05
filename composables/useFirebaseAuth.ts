import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification, getAuth } from 'firebase/auth'

export const useFirebaseAuth = () => {
  const { addUser, readById, read } = useFirestore()
  const { $auth } = useNuxtApp()
  const errorMessage = useState(() => '')
  const dataFetched = useState(() => [])
  const courses = useState(() => [])
  const students = useState(() => [])

  const userUID = useState(() => '')

  const register = async(email: string, password: string, data: Object) => {
     try {
      const userCredentials = await createUserWithEmailAndPassword($auth, email, password)
      const user = userCredentials.user
      await sendEmailVerification(user) 
      await signOut($auth)
      await addUser('pendingUsers', user.uid, data)
      console.log("registered user", user)
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email address'
          break
        case 'auth/email-already-in-use':
          errorMessage.value = 'Email address is already in use'
          break
        case 'auth/operation-not-allowed':
          errorMessage.value = 'Operation not allowed. Please contact support'
          break
        case 'auth/weak-password':
          errorMessage.value = 'Password is too weak. Please choose a stronger password'
          break
        default:
          errorMessage.value = 'Registration failed. Please try again later'
          break
        }
    }
  }

  const addActivity = async(uid: string, data: Object) => {
     try {
      // const auth = getAuth()
      // const userCredentials = auth.currentUser
      // const user = userCredentials.uid
      await addUser('activities',uid, data)
      console.log("created activities user", user)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const loginUser = async(email: string, password: string) => {
     try {
      const userCredentials = await signInWithEmailAndPassword($auth, email, password)
      const user = userCredentials.user
      if (user && user.emailVerified){
        const userDataArray = await readById('pendingUsers', user.email)
        const userData = userDataArray[0]
        dataFetched.value = userData
        await addUser('users', user.uid, {
          isAdmin: userData.isAdmin,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          createdAt: userData.createdAt,
          joinedActivities: []
        })
        console.log("user data", userData)
        await navigateTo('/student/home')
      } else {
        console.log("not verified", user)
        await navigateTo('/')
      }
      console.log("logged user", user)
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage.value = 'Invalid email or password'
      } else {
        errorMessage.value = 'Invalid email or password'
      }
    } 
  }

  const loginAdmin = async(email: string, password: string) => {
     try {
      const adminCredentials = await signInWithEmailAndPassword($auth, email, password)
      const admin = adminCredentials.user
      if (admin && admin.emailVerified){
        const adminDataArray = await readById('pendingUsers', admin.email)
        const adminData = adminDataArray[0]
        await addUser('admins', admin.uid, {
          isAdmin: adminData.isAdmin,
          email: adminData.email,
          name: `${adminData.firstName} ${adminData.lastName}`,
          createdAt: adminData.createdAt
        })
        console.log("admin data", adminData)
        await navigateTo('/admin')
      } else {
        await navigateTo('/adminLogin')
      }
      console.log("logged admin", admin)
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage.value = 'Invalid email or password'
      } else {
        errorMessage.value = 'Invalid email or password'
      }
    } 
  }

  const getCourses = async () => {
    try {
      const coursesDataArray = await read("courses")
      courses.value = coursesDataArray
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getStudents = async () => {
    try {
      const studentsDataArray = await read("users")
      students.value = studentsDataArray
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  // const addCourse = async () => {
  //   try {
      
  //   } catch (error) {
  //     errorMessage.value = `${error}`
  //   }
  // }

  // const addActivites = async () => {
  //   try {
      
  //   } catch (error) {
  //     errorMessage.value = `${error}`
  //   }
  // }

  const authorizedUser = async() => {
    try {
      await onAuthStateChanged($auth, (user) => {
        if (user) {
          userUID.value = user.uid
          console.log("user uuid",userUID.value)
          console.log("user is authorized")
        }
      })
    } catch (error) {
      await navigateTo('/')
      errorMessage.value = `${error}`
    }
  }

  const logout = async () => {
    try {
      await signOut($auth)
      console.log("user logged out")
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getUserUID = () => {
    return userUID.value
  }

  return {
    errorMessage,
    dataFetched,
    register,
    addActivity,
    loginUser,
    loginAdmin,
    logout,
    getCourses,
    courses,
    getStudents,
    students,
    authorizedUser,
    getUserUID,
    userUID
  }
}