import { InformationCircleIcon } from "@heroicons/react/20/solid"

export default function Alerts({ type, message }) {
  const color =
    type === "success"
      ? "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800"
      : type === "danger"
      ? "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800"
      : "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800"

  return (
    <div className={`p-4 mb-4 flex text-sm font-bold rounded-lg ${color}`}>
      <InformationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-3" />
      <div>{message}</div>
    </div>
  )
}
