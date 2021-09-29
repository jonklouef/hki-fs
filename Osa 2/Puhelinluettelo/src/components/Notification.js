import React from 'react'

const Notification = ({ notification }) => {
  if (notification[0] === null) {
    return null
  } else if (notification[1] === "err") {
    return (
      <div className="error">
        {notification[0]}
      </div>
    )
  }

  return (
    <div className="note">
      {notification[0]}
    </div>
  )
}

export default Notification
