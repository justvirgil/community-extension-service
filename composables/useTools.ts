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

  const timestampToDate = (time: Timestamp[]) => {
    return time.map((time) => {
      const milliseconds =
        time.seconds * 1000 + Math.floor(time.nanoseconds / 1000000)
      return new Date(milliseconds)
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const timeToDate = (timestamp) => {
    const date = new Date(
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)
    )
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const generateUUID = () => {
    return uuidv4().replace(/-/g, '').substring(0, 20)
  }

  return {
    timeConverter,
    generateUUID,
    timestampToDate,
    timeToDate,
    formatDate
  }
}
