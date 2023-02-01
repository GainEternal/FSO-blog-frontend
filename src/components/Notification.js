const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let className = 'confirm'

  if (message.type === 'error') {
    className = 'error'
  }

  return <div className={`notification ${className}`}>{message.message}</div>
}

export default Notification
