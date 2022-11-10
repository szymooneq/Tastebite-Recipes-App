export default function Badge({ color, children }) {
  return (
    <span className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-${color}-100 text-${color}-800 dark:bg-${color}-200 dark:text-${color}-900`}>
      {children}
    </span>
  )
}
