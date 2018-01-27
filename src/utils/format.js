import moment from 'moment'

export const relativeDate = (timestamp) => moment(timestamp).fromNow()

export const largeDate = (timestamp) =>
  moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

export const firstCap = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1)
