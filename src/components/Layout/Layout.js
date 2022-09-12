import React from 'react'

function Layout(props) {
  return (
    <div>
      <div>{props.header}</div>
      <div className='container'>{props.menu}</div>
      <div className='container'>{props.content}</div>
      <div>{props.footer}</div>
    </div>
  )
}

export default Layout