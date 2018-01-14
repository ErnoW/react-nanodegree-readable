import moment from 'moment'

export const relativeDate = (timestamp) => {
  return moment(timestamp).fromNow()
}

export const largeDate = (timestamp) => {
  return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
}
