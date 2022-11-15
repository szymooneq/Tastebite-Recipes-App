import { ChartBarIcon, ClockIcon, StarIcon } from '@heroicons/react/20/solid';

export default function Badges({ duration, level, rating }) {
  return (
    <div className="flex gap-2">
      <span
        className="px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900">
        <ClockIcon className="mr-1 w-3 h-3" />
        {`${duration} min`}
      </span>
      <span
        className="px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900">
        <ChartBarIcon className="mr-1 w-3 h-3" />
        {level}
      </span>
      <span
        className="px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
        <StarIcon className="mr-1 w-3 h-3" />
        {`${rating ?? "Brak ocen"}`}
      </span>
    </div>
  );
}
