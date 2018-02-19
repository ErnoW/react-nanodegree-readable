import moment from 'moment'

export const relativeDate = (timestamp: number) =>
  moment((timestamp: number)).fromNow()

export const largeDate = (timestamp: number) =>
  moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

export const currentYear = (timestamp: number) =>
  moment(timestamp).format('YYYY')

export const firstCap = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)
