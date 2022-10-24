import { InformationCircleIcon } from '@heroicons/react/20/solid'

const Success = (props) => {
  return (
    <div className="p-4 mb-4 flex text-sm rounded-lg text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800">
      <InformationCircleIcon className='flex-shrink-0 inline w-5 h-5 mr-3' />
      <div>{props.message}</div>
    </div>
  )
}

const Danger = (props) => {
  return (
    <div className="p-4 mb-4 flex text-sm font-semibold rounded-lg text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800">
      <InformationCircleIcon className='flex-shrink-0 inline w-5 h-5 mr-3' />
      <div>{props.message}</div>
    </div>
  )
}

const Info = (props) => {
  return (
    <div className="p-4 mb-4 flex text-sm rounded-lg text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800">
      <InformationCircleIcon className='flex-shrink-0 inline w-5 h-5 mr-3' />
      <div>{props.message}</div>
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