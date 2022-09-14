import React from 'react'
import Fragment from '../../hoc/Fragment'
import withClass from '../../hoc/withClass'

function Layout(props) {
  return (
    <>
      <div>{props.header}</div>
      <div className='container'>{props.menu}</div>
      <div className='container'>{props.content}</div>
      <div>{props.footer}</div>
    </>
  )
}

export default withClass(Layout, 'layout')