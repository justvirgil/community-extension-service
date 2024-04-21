import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  getAuth
} from 'firebase/auth'
import { arrayUnion, arrayRemove } from 'firebase/firestore'
export const useFirebaseAuth = () => {
  const {
    addUser,
    addSubcollection,
    updateSubcollection,
    readById,
    read,
    update,
    del
  } = useFirestore()
  const { generateUUID } = useTools()
  const { $auth } = useNuxtApp()
  const errorMessage = useState(() => '')
  const dataFetched = useState(() => [])
  const courses = useState(() => [])
  const activity = useState(() => [])
  const selectedActivityId = useState(() => '')
  const specificActivity = useState(() => [])
  const filteredActivities = useState(() => [])
  const activityLocations = useState(() => [])
  const studentActivityWithinProfile = useState(() => {})
  const students = useState(() => [])
  const allStudentId = useState(() => [])
  const profile = useState(() => [])
  const profileActivity = useState(() => {})
  const notification = useState(() => [])
  const notificationMessage = useState(() => [])
  const userActivityCompleted = useState(() => [])
  const userActivityPending = useState(() => [])
  const userActivityUpcoming = useState(() => [])
  const userActivityCancelled = useState(() => [])
  const unreadNotification = useState(() => '')
  const generatedUUID = generateUUID()

  const userUID = useState(() => '')

  const register = async (email: string, password: string, data: Object) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        $auth,
        email,
        password
      )
      const user = userCredentials.user
      await sendEmailVerification(user)
      await signOut($auth)
      await addUser('pendingUsers', user.uid, data)
      console.log('registered user', user)
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
          errorMessage.value =
            'Password is too weak. Please choose a stronger password'
          break
        default:
          errorMessage.value = 'Registration failed. Please try again later'
          break
      }
    }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        $auth,
        email,
        password
      )
      const user = userCredentials.user
      if (user && user.emailVerified) {
        const userDataArray = await readById('pendingUsers', user.email)
        const userExistArray = await readById('users', user.email)

        const userExist = userExistArray[0]

        if (userExistArray.length !== 0) {
          await navigateTo('/student/home')
        } else {
          const userData = userDataArray[0]
          dataFetched.value = userData

          const userObject = {
            isAdmin: userData.isAdmin,
            email: userData.email,
            name: userData.name,
            createdAt: userData?.createdAt
          }

          if (userData.course && userData.yearLevel) {
            userObject.course = userData.course
            userObject.yearLevel = userData.yearLevel
          }

          await addUser('users', user.uid, userObject)
          errorMessage.value = ''
          await navigateTo('/student/home')
        }
      } else {
        errorMessage.value = 'User not verified'
        await navigateTo('/')
      }
      errorMessage.value = ''
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage.value = 'Invalid email or password'
      } else {
        errorMessage.value = 'Invalid email or password'
      }
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      const adminCredentials = await signInWithEmailAndPassword(
        $auth,
        email,
        password
      )
      const admin = adminCredentials.user
      const adminDataArray = await readById('admins', admin.email)
      if (adminDataArray.length === 0 || adminDataArray[0].isAdmin === false) {
        errorMessage.value = 'Unauthorized role'
      } else if (!admin.emailVerified) {
        errorMessage.value = 'Email not verified'
      } else if (
        admin &&
        admin.emailVerified &&
        adminDataArray[0].isAdmin === true
      ) {
        const adminData = adminDataArray[0]
        await addUser('pendingUsers', admin.uid, {
          isAdmin: adminData.isAdmin,
          email: adminData.email,
          name: `${adminData.firstName} ${adminData.lastName}`,
          createdAt: adminData.createdAt
        })
        await navigateTo('/admin/home')
      } else {
        await navigateTo('/admin/login')
      }
    } catch (error) {
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        errorMessage.value = 'Invalid email or password'
      } else {
        errorMessage.value = 'Invalid email or password'
      }
    }
  }

  const addActivity = async (uid: string, data: Object) => {
    try {
      await addUser('activities', uid, data)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const updateActivity = async (uid: string, data: Object) => {
    try {
      await update('activities', uid, data)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const deleteActivity = async (uid: string) => {
    try {
      await del('activities', uid)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getCourses = async () => {
    try {
      const coursesDataArray = await read('courses')
      courses.value = coursesDataArray
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getActivities = async () => {
    try {
      const activityDataArray = await read('activities')
      activity.value = activityDataArray
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getActivityById = async (activityId: string) => {
    try {
      const activityDataArray = await read('activities')

      const activity = activityDataArray.find(
        (activity) => activity.id === activityId
      )

      specificActivity.value = activity
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const filterAllActivities = async () => {
    try {
      const dataArray = await read('activities')
      filteredActivities.value = dataArray
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const filterActivitiesByStatus = async (status: string) => {
    try {
      const dataArray = await read('activities')

      const filteredData = dataArray.filter(
        (activity) => activity.status === status
      )

      filteredActivities.value = filteredData
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const filterActivitiesByLevel = async (year: number) => {
    try {
      const dataArray = await read('activities')

      const filteredData = dataArray.filter(
        (activity) => activity.yearLevel === year
      )

      filteredActivities.value = filteredData
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getUserAcitivities = async () => {
    try {
      const userDataArray = await read('activities')

      const filterComplete = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(userUID.value) ||
            activity.approvedUsers?.includes(userUID.value) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'completed'
      )

      const filterUpcoming = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(userUID.value) ||
            activity.approvedUsers?.includes(userUID.value) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'upcoming'
      )

      const filterPending = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(userUID.value) ||
            activity.approvedUsers?.includes(userUID.value) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'pending'
      )

      const filterCancelled = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(userUID.value) ||
            activity.approvedUsers?.includes(userUID.value) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'cancelled'
      )

      userActivityCompleted.value = filterComplete
      userActivityPending.value = filterUpcoming
      userActivityUpcoming.value = filterPending
      userActivityCancelled.value = filterCancelled
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getStudentAcitivities = async (studentId: string) => {
    try {
      const userDataArray = await read('activities')

      const filterComplete = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(studentId) ||
            activity.approvedUsers?.includes(studentId) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'completed'
      )

      const filterUpcoming = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(studentId) ||
            activity.approvedUsers?.includes(studentId) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'upcoming'
      )

      const filterPending = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(studentId) ||
            activity.approvedUsers?.includes(studentId) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'pending'
      )

      const filterCancelled = userDataArray.filter(
        (activity) =>
          (activity.pendingUsers?.includes(studentId) ||
            activity.approvedUsers?.includes(studentId) ||
            !activity.pendingUsers ||
            !activity.approvedUsers) &&
          activity.status === 'cancelled'
      )

      userActivityCompleted.value = filterComplete
      userActivityPending.value = filterUpcoming
      userActivityUpcoming.value = filterPending
      userActivityCancelled.value = filterCancelled
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getStudents = async () => {
    try {
      const studentsDataArray = await read('users')
      students.value = studentsDataArray
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getStudentsIds = async () => {
    try {
      const studentsDataArray = await read('users')
      const studentIds = studentsDataArray.map((student) => student.id)
      allStudentId.value = studentIds
      return studentIds
    } catch (error) {
      errorMessage.value = `${error}`
      return []
    }
  }

  const updateUserActivity = async (activityID: string, userID: string) => {
    try {
      await update('users', userID, {
        joinedActivities: activityID
      })
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const updateProfile = async (userID: string, data: Object) => {
    try {
      await update('users', userID, data)
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const updateUserAvatar = async (userId, avatarPath) => {
    try {
      await update('users', userId, { avatar: avatarPath })
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const joinActivity = async (
    activityID: string,
    userID: string,
    data: Object
  ) => {
    try {
      await update('activities', activityID, {
        pendingUsers: arrayUnion(userID)
      })

      const studentsDataArray = await read('users')
      const userProfile = studentsDataArray.find(
        (student) => student.id === userID
      )
      const joinedActivities = userProfile.joinedActivities || {}

      const updatedJoinedActivities = {
        ...joinedActivities,
        [activityID]: data
      }

      await update('users', userUID.value, {
        joinedActivities: updatedJoinedActivities
      })

      errorMessage.value = ''
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const removeActivity = async (activityID: string, userID: string) => {
    try {
      await update('activities', activityID, {
        pendingUsers: arrayRemove(userID)
      })
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const authorizedUser = async () => {
    try {
      const auth = getAuth()
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          userUID.value = user.uid
          console.log('user uuid', userUID.value)
          console.log('user is authorized')
        }
      })
    } catch (error) {
      await navigateTo('/')
      errorMessage.value = `${error}`
    }
  }

  const addNotification = async (data: Object) => {
    try {
      await addSubcollection(
        'notifications',
        userUID.value,
        'notificationList',
        generateUUID(),
        data
      )
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getNotification = async () => {
    try {
      const notifDataArray = await read(
        `notifications/${userUID.value}/notificationList`
      )
      notification.value = notifDataArray

      const unreadLength = notifDataArray.filter(
        (notification) => !notification.isRead
      ).length

      const unreadMessage = notifDataArray

      unreadNotification.value = unreadLength
      notificationMessage.value = unreadMessage
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const updateNotification = async () => {
    try {
      const notifDataArray = notification.value
      const studentIds = await getStudentsIds() // Assuming you have defined getStudentsIds function

      for (const studentId of studentIds) {
        for (const notificationItem of notifDataArray) {
          await updateSubcollection(
            'notifications',
            studentId,
            'notificationList',
            notificationItem.id,
            {
              isRead: true
            }
          )
        }
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getProfile = async () => {
    try {
      const studentsDataArray = await read('users')

      const userProfile = studentsDataArray.find(
        (student) => student.id === userUID.value
      )

      profile.value = userProfile

      if (userProfile && userProfile.joinedActivities) {
        profileActivity.value = Object.values(userProfile.joinedActivities)
      } else {
        profileActivity.value = []
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getProfileById = async (uid: string) => {
    try {
      const studentsDataArray = await read('users')
      const userProfile = studentsDataArray.find(
        (student) => student.id === uid
      )
      profile.value = userProfile

      if (userProfile && userProfile.joinedActivities) {
        profileActivity.value = userProfile.joinedActivities
      } else {
        profileActivity.value = {}
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getProfileActivityById = async (uid: string, activityId: string) => {
    try {
      const studentsDataArray = await read('users')
      const userProfile = studentsDataArray.find(
        (student) => student.id === uid
      )

      if (userProfile && userProfile.joinedActivities) {
        const joinedActivity = userProfile.joinedActivities[activityId]
        if (joinedActivity) {
          studentActivityWithinProfile.value = joinedActivity
        } else {
          studentActivityWithinProfile.value = {}
        }
      } else {
        studentActivityWithinProfile.value = {}
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const addActivityPoints = async (uid: string, activityId: string) => {
    try {
      const studentsDataArray = await read('users')
      const userProfile = studentsDataArray.find(
        (student) => student.id === uid
      )

      if (userProfile && userProfile.joinedActivities) {
        const joinedActivity = userProfile.joinedActivities[activityId]
        if (joinedActivity) {
          joinedActivity.points += 0.5

          userProfile.joinedActivities[activityId] = joinedActivity

          await update('users', userProfile.id, userProfile)
        }
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const minusActivityPoints = async (uid: string, activityId: string) => {
    try {
      const studentsDataArray = await read('users')
      const userProfile = studentsDataArray.find(
        (student) => student.id === uid
      )

      if (userProfile && userProfile.joinedActivities) {
        const joinedActivity = userProfile.joinedActivities[activityId]
        if (joinedActivity) {
          joinedActivity.points -= 0.5

          userProfile.joinedActivities[activityId] = joinedActivity

          await update('users', userProfile.id, userProfile)
        }
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getActivityLocation = async () => {
    try {
      const userDataArray = await read('activities')

      const isMember = userDataArray.filter(
        (activity) =>
          activity.pendingUsers.includes(userUID.value) ||
          activity.approvedUsers.includes(userUID.value)
      )

      activityLocations.value = isMember
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getUserAllActivities = async () => {
    try {
      const userDataArray = await read('activities')

      const isMember = userDataArray.filter(
        (activity) =>
          activity.pendingUsers?.includes(userUID.value) ||
          activity.approvedUsers?.includes(userUID.value) ||
          !activity.pendingUsers ||
          !activity.approvedUsers
      )

      activity.value = isMember
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getUserProfile = () => {
    try {
      const auth = getAuth()
      const user = auth.currentUser()
      if (user) {
        console.log('test', user)
      }
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const logout = async () => {
    try {
      await signOut($auth)
      console.log('user logged out')
    } catch (error) {
      errorMessage.value = `${error}`
    }
  }

  const getUserUID = () => {
    return userUID.value
  }

  const getUserYearLevel = () => {
    if (profile.value && profile.value.yearLevel) {
      return profile.value.yearLevel
    }
    return undefined
  }

  return {
    errorMessage,
    dataFetched,
    register,
    addActivity,
    updateActivity,
    deleteActivity,
    getUserAcitivities,
    getStudentAcitivities,
    userActivityCompleted,
    userActivityPending,
    userActivityUpcoming,
    userActivityCancelled,
    filterActivitiesByStatus,
    filterActivitiesByLevel,
    filterAllActivities,
    filteredActivities,
    addNotification,
    getNotification,
    updateNotification,
    updateUserAvatar,
    notification,
    unreadNotification,
    notificationMessage,
    loginUser,
    loginAdmin,
    logout,
    getCourses,
    courses,
    getStudents,
    students,
    getActivities,
    profileActivity,
    activity,
    getActivityById,
    specificActivity,
    selectedActivityId,
    getProfile,
    getProfileById,
    updateProfile,
    profile,
    updateUserActivity,
    activityLocations,
    getActivityLocation,
    joinActivity,
    removeActivity,
    authorizedUser,
    getUserProfile,
    getUserUID,
    getUserYearLevel,
    userUID,
    getUserAllActivities,
    getProfileActivityById,
    studentActivityWithinProfile,
    addActivityPoints,
    minusActivityPoints,
    getStudentsIds,
    allStudentId
  }
}
