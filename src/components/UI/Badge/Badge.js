export default function Badge(props) {
  return (
    <span className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-${props.color}-100 text-${props.color}-800 dark:bg-${props.color}-200 dark:text-${props.color}-900`}>
      {props.children}
    </span>
  )
}
