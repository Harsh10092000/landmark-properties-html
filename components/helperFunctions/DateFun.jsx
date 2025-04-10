
import moment from 'moment'

export const GetDay = ({date}) => {
    return moment(date).format('DD');
}


export const GetMonth = ({date}) => {
    return moment(date).format('MMM');
  }


  export  const DateFormatter = ({date}) => {
    return moment(date).format("MMMM D, YYYY");
  }