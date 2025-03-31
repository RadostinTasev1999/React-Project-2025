import moment from 'moment'

export const formattedDate = (rawDate) => {

    const newDate  = moment(rawDate)

    return newDate.format('MMMM Do YYYY, h:mm:ss a')
}