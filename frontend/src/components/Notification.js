import { useNotifValue } from '../NotifContext'

const Notification = () => {
  const notif = useNotifValue()

  let style = {}
  
  if (notif) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 5
    }
  }

  return (
      <div style={style}>
        {notif}
      </div>
  )
}

export default Notification
