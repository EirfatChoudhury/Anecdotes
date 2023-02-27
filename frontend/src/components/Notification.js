import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notificationMessage }) => {
    if (notificationMessage !== '') {
      return notificationMessage
    }
    return null
  })

  let style = {}

  if (notification) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      marginBottom: 30
    }
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification