const Success = (props) => {
  return (
    <div className="flex p-4 mb-4 text-sm rounded-lg role text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800" role="alert">
      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <span className="sr-only">Info</span>
      <div className="font-semibold text-green-600 dark:text-green-500">{props.message}</div>
    </div>
  )
}

const Danger = (props) => {
  return (
    <div className="flex p-4 mb-4 text-sm rounded-lg role text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800" role="alert">
      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <span className="sr-only">Info</span>
      <div className="font-semibold text-red-600 dark:text-red-500">{props.message}</div>
    </div>
  )
}

const Info = (props) => {
  return (
    <div className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
      <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <span className="sr-only">Info</span>
      <div>
        <div className="font-medium text-blue-600 dark:text-blue-500">{props.message}</div>
      </div>
    </div>
  )
}

export default function Alert(props) {
 switch(props.theme) {
  case 'success':
    return <Success {...props} />
  case 'danger':
    return <Danger {...props} />
  default:
    return <Info {...props} />
 }
}