import { v4 as uuidv4 } from 'uuid'

export const useTools = () => {
  const timeConverter = (time: Timestamp) => {
    const milliseconds = time.seconds * 1000 + time.nanoseconds / 1000000
    const date = new Date(milliseconds)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }

  const generateUUID = () => {
    return uuidv4().replace(/-/g, '').substring(0, 20)
  }

  return {
    timeConverter,
    generateUUID
  }
}
