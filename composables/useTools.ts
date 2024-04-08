export const useTools = () => {
	
	const timeConverter = (time: Timestamp) => {
		const milliseconds = time.seconds * 1000 + time.nanoseconds / 1000000
		const date = new Date(milliseconds)
		return date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
	}
	
	return {
		timeConverter
	}
}